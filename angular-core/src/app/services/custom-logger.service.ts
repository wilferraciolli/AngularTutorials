import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomLoggerService {
  public log(message: string): void {
    console.log(message, Date.now());
  }

  public error(message: string): void {
    console.error(message, Date.now());
  }
}
