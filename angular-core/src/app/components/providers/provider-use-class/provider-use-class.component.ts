import { Component, inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CustomLoggerService } from '../../../services/custom-logger.service';
import { LoggerService } from '../../../services/logger.service';

@Component({
  selector: 'app-provider-use-class',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatIcon
  ],
  providers: [
    { provide: LoggerService, useClass: CustomLoggerService }
  ],
  templateUrl: './provider-use-class.component.html',
  styleUrl: './provider-use-class.component.scss'
})
export class ProviderUseClassComponent {
  // even though we are injecting the LoggerService, we are still using the CustomLoggerService
  private _logService: LoggerService = inject(LoggerService);

  public logMessage(): void {
    this._logService.log('Logging from ProviderUseValueComponent');
  }
}
