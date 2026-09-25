import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { TextToAudioComponent } from './components/text-to-audio/text-to-audio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ChatComponent },
  { path: 'text-to-audio', component: TextToAudioComponent }
];
