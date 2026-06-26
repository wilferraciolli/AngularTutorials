import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

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
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  tempWords: string = '';
  text: string = '';

  private mediaRecorder?: MediaRecorder;
  private audioChunks: Blob[] = [];
  private recordingStartTime = 0;
  recordings: AudioRecording[] = [];
  private nextId = 1;

  constructor() {
    this.recognition.interimResults = true;
    this.recognition.continuous = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = 'en-US';
  }

  get liveText(): string {
    return this.text + this.tempWords;
  }

  init() {
    this.recognition.addEventListener('result', (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.text += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      this.tempWords = interimTranscript;
    });
  }

  async start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log('Speech recognition started');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);
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

    this.recognition.addEventListener('end', () => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log('End speech recognition');
      } else {
        this.recognition.start();
      }
    });
  }

  stop(): Promise<AudioRecording | null> {
    this.isStoppedSpeechRecog = true;
    const finalTranscript = this.liveText.trim();
    this.text += this.tempWords;
    this.tempWords = '';
    this.recognition.stop();
    console.log('End speech recognition');

    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      const duration = Math.max(1, Math.round((Date.now() - this.recordingStartTime) / 1000));

      this.mediaRecorder.addEventListener('stop', () => {
        const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
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
