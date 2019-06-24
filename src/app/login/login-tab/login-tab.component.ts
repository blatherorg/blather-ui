import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { NotificationTypes } from '../../types/notification';

@Component({
  selector: 'app-login-tab',
  templateUrl: './login-tab.component.html',
  styleUrls: ['./login-tab.component.scss']
})
export class LoginTabComponent implements OnInit {

  // TODO: add notifications for error cases.

  public password: string = '';
  public email: string = '';
  public hidePassword: boolean = true;

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() { }

  public login(): void {
    this.loginService.login(this.email, this.password).subscribe(() => {
      // successful login
      this.router.navigate(['/feed']);
    }, error => {
      // unsuccessful login
      this.email = '';
      this.password = '';
      this.notificationService.addNotification(NotificationTypes.Danger, 'Error logging in');
    });
  }

  public loginDisabled(): boolean {
    return !this.password || !this.email;
  }
}
