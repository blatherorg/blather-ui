import { User, RegisterUser } from './../../types/user';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../login.service';
import { NotificationService } from '../../notification/notification.service';
import { NotificationTypes } from '../../types/notification';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-tab',
  templateUrl: './register-tab.component.html',
  styleUrls: ['./register-tab.component.scss']
})
export class RegisterTabComponent implements OnInit {

  // TODO: add notificaitons for error states
  // TODO: handle case where handle or email are taken
  // TODO: add error state matcher for email/handle/password?
  // TODO: set password guidelines?
  // TODO: validate valid email address

  public newUser: RegisterUser = {
    handle: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };
  public hidePassword: boolean = true;

  constructor(private router: Router, private loginService: LoginService, private notificationService: NotificationService) { }

  public ngOnInit(): void {}

  public register(): void {
    this.loginService.registerUser(this.newUser).subscribe(success => {
      console.log(JSON.stringify(success));
      this.router.navigate(['/login']);
      this.notificationService.addNotification(NotificationTypes.Success, 'Successfully registered, please login.');
    }, (err: HttpErrorResponse) => {
      this.notificationService.addNotification(NotificationTypes.Danger, JSON.stringify(err));
    });
  }

  public registerDisabled(): boolean {
    return !this.newUser.handle || !this.newUser.email || !this.newUser.firstName || !this.newUser.lastName || !this.newUser.password;
  }
}
