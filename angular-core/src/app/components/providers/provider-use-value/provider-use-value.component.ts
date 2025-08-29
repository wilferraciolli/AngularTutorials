import { Component, Inject, inject, InjectionToken, signal, WritableSignal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { USER_CONFIG_TOKEN, UserConfig } from '../../../constants/user-config';
import { LoggerService } from '../../../services/logger.service';


@Component({
  selector: 'app-provider-use-value',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIcon
  ],
  providers: [
    { provide: USER_CONFIG_TOKEN, useValue: { language: 'jp' } }
  ],
  templateUrl: './provider-use-value.component.html',
  styleUrl: './provider-use-value.component.scss'
})
export class ProviderUseValueComponent {
  public value: WritableSignal<string> = signal('');

  constructor(
    @Inject(USER_CONFIG_TOKEN) private userConfig: UserConfig
  ) { }

  public logMessage(): void {
    this.value.set(this.userConfig.toString());
  }
}
