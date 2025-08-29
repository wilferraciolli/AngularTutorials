import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CustomLanguageService } from '../../../services/custom-language.service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-provider-use-existing',
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
    { provide: CustomLanguageService, useExisting: LanguageService }
  ],
  templateUrl: './provider-use-existing.component.html',
  styleUrl: './provider-use-existing.component.scss'
})
export class ProviderUseExistingComponent {
  private _languageService: CustomLanguageService = inject(CustomLanguageService);

  public value: WritableSignal<string> = signal('');

  public logMessage(): void {
   this.value.set(this._languageService.japanese('Some text'));
  }
}
