import { Component, computed, OnDestroy, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { interval, Subscription } from 'rxjs';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';

@Component({
  selector: 'app-chat',
  imports: [
    FormsModule,
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, OnDestroy {
  public messages: WritableSignal<string[]> = signal<string[]>([]);
  public isRecording: WritableSignal<boolean> = signal<boolean>(false);
  public message: WritableSignal<string> = signal<string>('');

  public hasMessage: Signal<boolean> = computed(() => this.message().length > 0);

  private liveTextSubscription?: Subscription;

  constructor(public voiceRecognitionService: VoiceRecognitionService) {
  }

  ngOnInit() {
    this.voiceRecognitionService.init();
  }

  ngOnDestroy() {
    this.liveTextSubscription?.unsubscribe();
  }

  startRecording() {
    this.voiceRecognitionService.text = '';
    this.voiceRecognitionService.tempWords = '';
    this.voiceRecognitionService.start();
    this.isRecording.set(true);

    // Update textarea every second with live transcription
    this.liveTextSubscription = interval(1000).subscribe(() => {
      this.message.set(this.voiceRecognitionService.liveText);
    });
  }

  stopRecording() {
    this.liveTextSubscription?.unsubscribe();
    this.voiceRecognitionService.stop();
    this.message.set(this.voiceRecognitionService.liveText);
    this.voiceRecognitionService.text = '';
    this.isRecording.set(false);
  }

  submitMessage(_event: Event) {
    if (!this.message().trim()) return;
    console.log('Message submitted:', this.message());
    this.messages.update(messages => [...messages, this.message()]);
    this.message.set('');
  }

}
