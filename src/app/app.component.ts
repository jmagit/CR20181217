import { Component } from '@angular/core';
import { AuthService } from './common-app/seguridad.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  public login() {
    if (this.auth.isAutenticated) {
      this.auth.logout();
    } else {
      this.auth.login('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU0NTMwMzkwMn0.YGYvu0ZAFG6pYglm8sS7jCISQuHm5g9-KtEQFC4058Y', 'admin');
    }
  }
}
