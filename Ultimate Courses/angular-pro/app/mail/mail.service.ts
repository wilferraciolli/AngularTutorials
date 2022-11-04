import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Mail } from './models/mail.interface';

@Injectable()
export class MailService {

  constructor(private http: Http) {
  }

  public getFolder(folderName: string): Observable<Array<Mail>> {
    return this.http.get(`/api/messages?folder=${folderName}`)
      .map(response => response.json());
  }
}
