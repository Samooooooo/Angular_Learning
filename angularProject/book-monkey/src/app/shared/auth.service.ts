import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticatd$ = new BehaviorSubject(true);
  readonly isAuthenticatd$ = this._isAuthenticatd$.asObservable();

  login() {
    this._isAuthenticatd$.next(true);
  }

  logout() {
    this._isAuthenticatd$.next(false);
  }

  get isAuthenticated() {
    return this._isAuthenticatd$.value;
  }
}
