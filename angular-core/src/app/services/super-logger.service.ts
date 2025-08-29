import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class SuperLoggerService {
  constructor(private languageService: LanguageService) { }

  public log(message: string): void {
    console.log(this.languageService.french(message), Date.toString());
  }

  public error(message: string): void {
    console.error(this.languageService.french(message), Date.toString());
  }
}
