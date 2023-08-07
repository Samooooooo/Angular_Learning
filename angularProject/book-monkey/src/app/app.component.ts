import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public auth: AuthService) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const loggedIn = this.auth.isAuthenticated;
  }
  get loggedIn(): boolean {
    return this.loggedIn.valueOf();
  }
}
