# 📱 Capacitor Migration Guide

> This document covers everything needed to port **Voice Recognition Chat** from a Chromium-only web app to a native iOS and Android app using Capacitor.

---

## Why the Web Version Won't Work on Mobile

The current app uses two browser APIs that are not available inside Capacitor's WebView:

### ❌ `webkitSpeechRecognition`
- **What it is:** Chrome's proprietary Web Speech API that streams audio to Google's servers for transcription
- **Why it breaks:** Capacitor on iOS uses **WKWebView** and on Android uses **Android System WebView** — neither exposes this API
- **Symptom:** `webkitSpeechRecognition is not defined` runtime error on both platforms

### ⚠️ `MediaRecorder` (audio capture)
| Platform | Support |
|---|---|
| Android WebView (Chromium-based, Android 10+) | ✅ Works |
| iOS WKWebView (iOS 14.5+) | ⚠️ Works but **`audio/webm` is unsupported** — must use `audio/mp4` |

---

## Solution — `@capacitor-community/speech-recognition`

Replace `webkitSpeechRecognition` with the community Capacitor plugin, which calls native platform APIs:

| Platform | Native API |
|---|---|
| iOS | `SFSpeechRecognizer` + `AVAudioEngine` |
| Android | `android.speech.SpeechRecognizer` |
| Web (browser fallback) | Web Speech API |

Supports:
- Continuous recognition
- Interim / partial results (equivalent to `interimResults: true`)
- Language selection
- Permission handling

---

## Step-by-Step Migration

### 1. Create a new Angular + Capacitor project

```bash
ng new voice-recognition-chat-mobile
cd voice-recognition-chat-mobile

# Install Capacitor core
npm install @capacitor/core @capacitor/cli

# Initialise Capacitor (use your app name and bundle ID)
npx cap init "Voice Recognition Chat" "com.yourcompany.voicechat"

# Add platforms
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

---

### 2. Install the Speech Recognition plugin

```bash
npm install @capacitor-community/speech-recognition
npx cap sync
```

---

### 3. Configure native permissions

#### iOS — `ios/App/App/Info.plist`
```xml
<key>NSSpeechRecognitionUsageDescription</key>
<string>This app uses speech recognition to transcribe your voice.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access to record your voice.</string>
```

#### Android — `android/app/src/main/AndroidManifest.xml`
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.INTERNET"/>
```

---

### 4. Copy UI files from this project

Copy these files unchanged — they require no modification:

```
src/app/app.component.ts
src/app/app.component.html
src/app/app.component.scss
src/app/app.config.ts
src/app/app.routes.ts
src/app/components/chat/chat.component.ts
src/app/components/chat/chat.component.html
src/app/components/chat/chat.component.scss
src/styles.scss
src/index.html
```

Install the same UI dependencies:
```bash
ng add @angular/material
```

---

### 5. Rewrite `VoiceRecognitionService`

Replace `src/app/services/voice-recognition.service.ts` with the following:

```typescript
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Capacitor } from '@capacitor/core';

export interface AudioRecording {
  id: number;
  blob: Blob;
  url: string;
  duration: number;
  transcript: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  isStoppedSpeechRecog = false;
  tempWords: string = '';
  text: string = '';

  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private recordingStartTime = 0;
  recordings: AudioRecording[] = [];
  private nextId = 1;

  // Detect platform so we can pick the right audio MIME type
  private get isNative(): boolean {
    return Capacitor.isNativePlatform();
  }

  private get isIOS(): boolean {
    return Capacitor.getPlatform() === 'ios';
  }

  private get mimeType(): string {
    return this.isIOS ? 'audio/mp4' : 'audio/webm';
  }

  get liveText(): string {
    return this.text + this.tempWords;
  }

  // No-op on Capacitor — listener is registered inside start()
  init() {}

  async start() {
    this.isStoppedSpeechRecog = false;

    // Request permission
    const { speechRecognition } = await SpeechRecognition.requestPermissions();
    if (speechRecognition !== 'granted') {
      console.error('Speech recognition permission denied');
      return;
    }

    // Listen for partial/final results
    await SpeechRecognition.removeAllListeners();

    SpeechRecognition.addListener('partialResults', (data: { matches: string[] }) => {
      if (!this.isStoppedSpeechRecog) {
        this.tempWords = data.matches?.[0] ?? '';
      }
    });

    await SpeechRecognition.start({
      language: 'en-US',
      maxResults: 1,
      partialResults: true,
      popup: false,       // no system dialog on Android
    });

    console.log('Speech recognition started');

    // Start audio capture in parallel
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: this.mimeType });
      this.recordingStartTime = Date.now();

      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      });

      this.mediaRecorder.start(100);
    } catch (err) {
      console.error('Microphone access denied:', err);
    }
  }

  stop(): Promise<AudioRecording | null> {
    this.isStoppedSpeechRecog = true;
    const finalTranscript = this.liveText.trim();
    this.text += this.tempWords;
    this.tempWords = '';

    SpeechRecognition.stop();
    SpeechRecognition.removeAllListeners();
    console.log('Speech recognition stopped');

    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      const duration = Math.max(1, Math.round((Date.now() - this.recordingStartTime) / 1000));

      this.mediaRecorder.addEventListener('stop', () => {
        const blob = new Blob(this.audioChunks, { type: this.mimeType });
        const url = URL.createObjectURL(blob);
        const recording: AudioRecording = {
          id: this.nextId++,
          blob,
          url,
          duration,
          transcript: finalTranscript,
          createdAt: new Date()
        };
        this.recordings.push(recording);
        this.mediaRecorder!.stream.getTracks().forEach(t => t.stop());
        resolve(recording);
      }, { once: true });

      this.mediaRecorder.stop();
    });
  }

  deleteRecording(id: number) {
    const index = this.recordings.findIndex(r => r.id === id);
    if (index !== -1) {
      URL.revokeObjectURL(this.recordings[index].url);
      this.recordings.splice(index, 1);
    }
  }
}
```

---

### 6. Build and sync

```bash
# Build the Angular app
ng build

# Copy web build into native projects
npx cap sync

# Open in Xcode (iOS)
npx cap open ios

# Open in Android Studio (Android)
npx cap open android
```

---

### 7. Run on device / simulator

```bash
# iOS simulator
npx cap run ios

# Android emulator or device
npx cap run android
```

> **Tip:** Speech recognition on iOS simulator is unreliable — always test on a physical device.

---

## Key Differences vs. the Web Version

| Concern | Web version | Capacitor version |
|---|---|---|
| Speech API | `webkitSpeechRecognition` | `@capacitor-community/speech-recognition` |
| Continuous mode | `recognition.continuous = true` + `end` handler restart loop | Plugin handles continuity internally |
| Interim results | `interimResults: true` + `resultIndex` loop | `partialResults: true` + `partialResults` listener |
| Audio MIME type | `audio/webm` | `audio/mp4` on iOS, `audio/webm` on Android |
| Permissions | Browser prompt (automatic) | Must call `requestPermissions()` + add Info.plist / Manifest entries |
| Error recovery | `onerror` + named `endHandler` | Plugin manages internally |
| `init()` method | Registers `result` listener | No-op (listener registered in `start()`) |

---

## Platform Compatibility

| Platform | Speech-to-text | Audio recording / playback |
|---|---|---|
| Chrome / Edge (desktop) | ✅ | ✅ |
| iOS app (Capacitor) | ✅ (iOS 13+) | ✅ (iOS 14.5+, `audio/mp4`) |
| Android app (Capacitor) | ✅ (Android 6+) | ✅ (Android 10+) |
| Firefox | ❌ | ✅ |
| Safari | ❌ | ✅ |

---

## Useful References

- [Capacitor Docs](https://capacitorjs.com/docs)
- [@capacitor-community/speech-recognition](https://github.com/capacitor-community/speech-recognition)
- [Capacitor iOS setup](https://capacitorjs.com/docs/ios)
- [Capacitor Android setup](https://capacitorjs.com/docs/android)
- [SFSpeechRecognizer (Apple)](https://developer.apple.com/documentation/speech/sfspeechrecognizer)
- [android.speech.SpeechRecognizer (Google)](https://developer.android.com/reference/android/speech/SpeechRecognizer)

