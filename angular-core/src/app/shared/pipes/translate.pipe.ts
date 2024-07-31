import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation/translation.service';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  private _translationService: TranslationService = inject(TranslationService);

  transform(value: string, language?: string): string {
    if (language){
      this._translationService.language = language;
    }else {
      this._translationService.language = 'eg';
    }

    return this._translationService.translate(value);
  }
}
