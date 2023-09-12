import { Component, inject, OnInit } from '@angular/core';
import { StorageManagerService } from '../storage-manager.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit {

  private _storageService: StorageManagerService = inject(StorageManagerService);

  public ngOnInit(): void {
    // get the element by reference
    const cookie: Element | null = document.querySelector('[data-cookie]');
    const accept: Element | null = document.querySelector('[data-cookie-accept]');
    const reject: Element | null = document.querySelector('[data-cookie-reject]');

    console.log(cookie);

    // add event handlers
    this._addAcceptCookieEvent(cookie, accept);
    this._addRejectCookieEvent(cookie, reject);

    if (cookie && this._shouldDisplayAllowCookie(cookie)) {
      this._showCookie(cookie);
    }
  }

  private _shouldDisplayAllowCookie(cookie: Element): boolean {
    // users who agree will have their cookie status saved onto local storage
    const cookieAccepted: boolean | null = this._storageService._getValueFromLocalStorage('cookie');

    // check whether the user has already accepted the cookie, only accept is saved onto local storage
    if (cookieAccepted === true) {
      return false;
    }

    // users who have denied will have their status saved onto session storage
    const cookieDenied: boolean | null = this._storageService._getValueFromSessionStorage('cookie');

    if (cookieDenied !== null) {
      // user has denied so it was saved onto session storage, meaning next time they visit the site they will be asked again
      return false;
    }

    return true;
  }

  private _addAcceptCookieEvent(cookie: Element | null, accept: Element | null): void {
    if (cookie && accept) {
      this._hideCookie(cookie);
      accept.addEventListener('click', () => {
        this._storageService._addValueToLocalStorage('cookie', true);
      });
    }
  }

  private _addRejectCookieEvent(cookie: Element | null, reject: Element | null): void {
    if (cookie && reject) {
      this._hideCookie(cookie);
      reject.addEventListener('click', () => {
        this._storageService._addValueToSessionStorage('cookie', false);
      });
    }
  }

  private _hideCookie(cookie: Element): void {
    // @ts-ignore
    cookie.style.display = 'none';
  }

  private _showCookie(cookie: Element): void {
    // @ts-ignore
    cookie.style.display = 'block';
  }
}
