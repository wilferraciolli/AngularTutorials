import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public french(text: string): string {
    return 'fr';
  }

  public japanese(text: string): string {
    return 'jp';
  }

  public elvish(text: string): string {
    return 'ev';
  }

  public klingon(text: string): string {
    return 'kl';
  }
}
