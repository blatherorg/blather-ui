import { User } from './types/user';
import { LoginService } from './login/login.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification/notification.service';
import { Notification, NotificationTypes } from './types/notification';
import { MatSnackBar, MatSnackBarRef, MatDialog, MatDialogRef } from '@angular/material';
import { NotificationComponent } from './notification/notification.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public loggedIn: boolean = false;
  public loggedInUser: User;
  private transientNotificationRef: MatSnackBarRef<NotificationComponent>;

  constructor(
    public loginService: LoginService,
    private notificationService: NotificationService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.loginService.getLoggedInUser().subscribe((loggedInUser: User | null) => {
        if (loggedInUser && loggedInUser.handle) {
          this.loggedInUser = loggedInUser;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
    });

    this.notificationService.getTransientNotifications().subscribe((notification: Notification) => {
      let panelClass: string = '';
      notification.type === NotificationTypes.Warning ? panelClass = 'warning-notification' :
      notification.type === NotificationTypes.Info ? panelClass = 'info-notification' :
      notification.type === NotificationTypes.Danger ? panelClass = 'danger-notification' :
      panelClass = 'success-notification';


      this.transientNotificationRef = this.snackBar.openFromComponent(NotificationComponent, {
        data: notification,
        panelClass: panelClass,
        verticalPosition: 'top'
      });
      this.transientNotificationRef.afterDismissed().subscribe(() => {
        this.closeTransientNotification();
      }, error => {
        console.error('Failed to close notification');
      });
    });
  }

  private closeTransientNotification(): void {
    this.transientNotificationRef.dismiss();
    this.transientNotificationRef = null;
    this.notificationService.closeTransientNotification();
  }

  private logoutServiceCall(): void {
    this.loginService.logoutServiceCall().subscribe(() => {
      this.notificationService.addNotification(NotificationTypes.Info, 'User has been logged out');
    }, () => {
      console.error('Error calling logout service');
    }, () => {
      this.loginService.logout();
    })
  }

  private openChangePasswordDialog(): void {
    const dialogRef: MatDialogRef<ChangePasswordComponent> = this.dialog.open(ChangePasswordComponent, {
      data: {handle: this.loggedInUser.handle}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
