import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated$ = new BehaviorSubject(true);
  readonly isAuthenticated$ = this._isAuthenticated$.asObservable();
  router = inject(Router);

  login() {
    this._isAuthenticated$.next(true);
    this.router.navigateByUrl('books');
  }

  logout() {
    this._isAuthenticated$.next(false);
    this.router.navigateByUrl('/');
  }

  get isAuthenticated() {
    return this._isAuthenticated$.value;
  }
}
