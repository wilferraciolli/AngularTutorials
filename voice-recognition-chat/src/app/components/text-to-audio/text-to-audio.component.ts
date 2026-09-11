import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { environment } from '../../../environments/environment';

type AudioRequest = {
  text: string;
  format: 'mp3';
  model: string;
};

@Component({
  selector: 'app-text-to-audio',
  imports: [
    FormsModule,
    NgIf,
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './text-to-audio.component.html',
  styleUrl: './text-to-audio.component.scss',
})
export class TextToAudioComponent {
  public messages: WritableSignal<string[]> = signal<string[]>([]);
  public message: WritableSignal<string> = signal<string>('');
  public audioUrl: WritableSignal<string | null> = signal<string | null>(null);
  public isLoading: WritableSignal<boolean> = signal<boolean>(false);

  public hasMessage: Signal<boolean> = computed(() => this.message().trim().length > 0);

  constructor(private http: HttpClient) {}

  submitMessage(_event: Event) {
    const text = this.message().trim();
    if (!text) {
      return;
    }

    this.isLoading.set(true);
    this.messages.update(messages => [...messages, text]);

    const payload: AudioRequest = {
      text,
      format: 'mp3',
      model: environment.fishModel
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.fishApiKey}`
    });

    this.http.post(environment.fishUrl, payload, {
      headers,
      responseType: 'arraybuffer'
    }).subscribe({
      next: (audioBuffer: ArrayBuffer) => {
        const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        const newAudioUrl = URL.createObjectURL(audioBlob);

        if (this.audioUrl()) {
          URL.revokeObjectURL(this.audioUrl() as string);
        }

        this.audioUrl.set(newAudioUrl);
        this.message.set('');
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Text-to-audio generation failed:', error);
        this.audioUrl.set(null);
        this.message.set('');
        this.isLoading.set(false);
      }
    });
  }
}
