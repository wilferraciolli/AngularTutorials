import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
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
export class ChatComponent implements OnInit {
  public messages: WritableSignal<string[]> = signal<string[]>([]);
  public isRecording: WritableSignal<boolean> = signal<boolean>(false);

  public message: string = '';

  public hasMessage: Signal<boolean> = computed(() => this.message.length > 0);

  constructor(public voiceRecognitionService: VoiceRecognitionService) {
  }

  ngOnInit() {
    this.voiceRecognitionService.init();
  }

  startRecording() {
    this.voiceRecognitionService.start();
    this.isRecording.set(true);
  }

  stopRecording() {
    this.voiceRecognitionService.stop();
    this.message += this.voiceRecognitionService.text;
    this.voiceRecognitionService.text = ''; // Clear the recognized text after appending to message
    this.isRecording.set(false);
  }

  submitMessage(event: Event) {
    // Handle message submission logic here
    console.log('Message submitted:', this.message);
    this.messages.update(messages => [...messages, this.message]);

    this.message = ''; // Clear the input after submission

  }

}
