# 🎙️ Voice Recognition Chat

An Angular demo application that lets you **speak into your microphone**, see a live transcription appear in real time, send messages to a chat feed, and **play back recordings** of everything you said — all stored in memory (cleared on page reload).

---

## ✨ Features

| Feature | Description |
|---|---|
| **Live speech-to-text** | Transcription appears in the textarea as you speak, updating every second |
| **Continuous recognition** | The browser automatically restarts recognition when it times out, so long recordings keep transcribing |
| **Audio recording** | Your voice is captured as a raw audio blob in parallel with the transcription |
| **Playback** | Every recording appears below the chat with a native audio player |
| **Transcript preview** | Each recording card shows a snippet of what was said |
| **Delete recordings** | Remove individual recordings; the blob URL is revoked to free memory |
| **Chat messages** | Finalized transcriptions (or typed text) are sent to a scrollable message feed |
| **In-memory only** | Recordings and messages live only in the browser — reloading the page clears everything |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Angular** | 22 | Application framework (standalone components, signals) |
| **Angular Material** | 22 | UI components — toolbar, buttons, icons, tooltips |
| **Angular Signals** | built-in | Reactive state (`signal`, `computed`) without RxJS overhead |
| **RxJS** | 7.8 | `interval` subscription for polling live transcript |
| **Web Speech API** | Browser built-in | `webkitSpeechRecognition` for continuous speech-to-text |
| **MediaRecorder API** | Browser built-in | Captures raw audio chunks for playback |
| **TypeScript** | 6.0 | Strictly typed throughout |

---

## 🏗️ Project Structure

```
src/app/
├── app.component.ts/html/scss   # Root shell — Material toolbar + router outlet
├── app.config.ts                # Angular providers / router config
├── app.routes.ts                # Route definitions
│
├── components/
│   └── chat/
│       ├── chat.component.ts    # Main UI logic (recording, messages, playback)
│       ├── chat.component.html  # Template — textarea, action buttons, messages, recordings
│       └── chat.component.scss  # Styles + animations (pulse, bounce, slide-up)
│
└── services/
    └── voice-recognition.service.ts  # Web Speech API + MediaRecorder orchestration
```

### Key service — `VoiceRecognitionService`

- Wraps `webkitSpeechRecognition` for continuous, interim-result transcription
- Runs `MediaRecorder` in parallel to capture audio chunks every 100 ms
- On `stop()`, assembles chunks into a `Blob`, creates an `ObjectURL`, and stores an `AudioRecording` object
- `endHandler` is a named field (not an anonymous function) so it can be safely removed and re-added without duplicating listeners across sessions
- Errors from the Speech API (`no-speech`, `network`, etc.) are caught; the `end` event that follows automatically triggers a restart

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- **Angular CLI** ≥ 22

  ```bash
  npm install -g @angular/cli
  ```

- A **Chromium-based browser** (Chrome, Edge) — `webkitSpeechRecognition` is not supported in Firefox or Safari

### Install

```bash
# Clone or open the project folder, then:
npm install
```

### Run (development server)

```bash
ng serve
# or
npm start
```

Then open **http://localhost:4200** in Chrome or Edge.

> The first time you click **Start Recording** the browser will ask for microphone permission — allow it.

### Build (production)

```bash
ng build
# Output goes to dist/voice-recognition-chat/
```

### Run tests

```bash
ng test
```

---

## 🎮 How to Use

1. **Type or speak** — the textarea accepts keyboard input normally, or use the mic button to dictate
2. **▶ Start recording** — click the red mic button; it pulses while active
   - Live transcription appears in the textarea as you speak
   - Audio is being captured in the background simultaneously
3. **⏹ Stop recording** — click the orange stop button
   - The final transcript is locked into the textarea
   - A recording card appears in the **Recordings** section below
4. **Send** — click the blue send button (or press **Enter**) to push the text to the chat feed
5. **Play back** — use the audio player on any recording card to replay what you said
6. **🗑 Delete** — click the red delete button on a card to remove it and free the memory

---

## ⚠️ Browser Compatibility

| Browser | Speech-to-text | Audio recording |
|---|---|---|
| Chrome 90+ | ✅ | ✅ |
| Edge 90+ | ✅ | ✅ |
| Firefox | ❌ | ✅ |
| Safari | ❌ | ✅ |

> Firefox and Safari do not implement `webkitSpeechRecognition`. The microphone recording will still work, but transcription will not.

---

## 📦 Installing Dependencies from Scratch

If you are setting up a fresh Angular project and want to add the same dependencies:

```bash
# Angular Material (includes CDK and animations)
ng add @angular/material
```
