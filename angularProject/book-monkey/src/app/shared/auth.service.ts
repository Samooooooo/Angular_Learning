import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated$ = new BehaviorSubject(false);
  readonly isAuthenticated$ = this._isAuthenticated$.asObservable();
  router = inject(Router);

  constructor() {
    // Check if the user is already authenticated from Local Storage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      this._isAuthenticated$.next(true);
    }
  }

  login() {
    this._isAuthenticated$.next(true);

    // Store authentication status in Local Storage
    localStorage.setItem('isAuthenticated', 'true');

    this.router.navigateByUrl('books');
  }

  logout() {
    this._isAuthenticated$.next(false);

    // Remove authentication status from Local Storage
    localStorage.removeItem('isAuthenticated');

    this.router.navigateByUrl('/');
  }

  get isAuthenticated() {
    return this._isAuthenticated$.value;
  }
}
