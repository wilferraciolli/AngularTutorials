import { Injectable } from '@angular/core';
import { TranslationDictionary } from './translation.dictionary';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  public languages: string[] = ['eg', 'it'];
  public language: string = 'eg';

  private dictionary: { [key: string]: TranslationDictionary } = {
    eg: {
      language: 'eg',
      values: {
        greeting: 'Hi',
        question: 'How are you?'
      }
    },
    it: {
      language: 'eg',
      values: {
        greeting: 'Ciao',
        question: 'come stai?'
      }
    }
  };

  constructor() {
  }

  public translate(key: string): string {
    if (this.dictionary[this.language] !== null) {
      return this.dictionary[this.language].values[key];
    }

    return 'Translation not found';
  }
}
