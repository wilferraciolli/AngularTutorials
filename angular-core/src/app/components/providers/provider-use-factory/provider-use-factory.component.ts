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
import { LanguageService } from '../../../services/language.service';
import { SuperLoggerService } from '../../../services/super-logger.service';

const loggerFactory = (languageService: LanguageService) => new SuperLoggerService(languageService);

@Component({
  selector: 'app-provider-use-factory',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardActions,
    MatIcon
  ],
  providers: [
    {
      provide: SuperLoggerService,
      useFactory: loggerFactory,
      deps: [LanguageService]
    }
  ],
  templateUrl: './provider-use-factory.component.html',
  styleUrl: './provider-use-factory.component.scss'
})
export class ProviderUseFactoryComponent {
  private _loggerService: SuperLoggerService = inject(SuperLoggerService);

  public logMessage(): void {
    this._loggerService.log('use factory message to log');
  }
}
