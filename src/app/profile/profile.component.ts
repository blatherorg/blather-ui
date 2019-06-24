import { Component, OnInit, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from './profile.service';
import { FeedService } from '../feed/feed.service';
import { Feed } from '../feed/feed';
import { LoginService } from '../login/login.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypes } from '../types/notification';
import { Observable } from 'rxjs';
import { User } from '../types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public blatz: Feed[] = [];
  private loggedInUser = new User('', '', '', '');
  public user = new User('', '', '', '');
  public message: string = '';
  private loggedInUserProfile: boolean = false;
  constructor(
    public activeRoute: ActivatedRoute,
    public profileService: ProfileService,
    public dialog: MatDialog,
    private feedService: FeedService,
    private loginService: LoginService,
    private notificationService: NotificationService
   ) {}

  public ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params => {
        this.loginService.getLoggedInUser().subscribe(
            (user: User) => {
              this.loggedInUser = user;
            });
        if (!params.handle || params.handle === this.loggedInUser.handle) {
          this.loggedInUserProfile = true;
          this.getProfile(this.loggedInUser.handle);
        } else {
          this.getProfile(params.handle);
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Failed getting activeRoute params.');
      });
  }

  public getBlatzByHandle(handle: string) {
    this.feedService.getBlatzByHandle(handle).subscribe(
      (blatz: Feed[]) => {
        this.blatz = blatz;
      },
      (error: HttpErrorResponse) => {
        this.notificationService.addNotification(NotificationTypes.Danger, 'Could not retrieve blatz');
      });
  }

  public editProfile(): void {
    const dialogRef: MatDialogRef<EditProfileDialogComponent> = this.dialog.open(EditProfileDialogComponent, {
      height: '500px',
      width: '500px',
      data: new User(
        this.user.handle,
        this.user.email,
        this.user.firstName,
        this.user.lastName)
    });
    dialogRef.afterClosed().subscribe(
      (result: User|null) => {
        if (result) {
          this.profileService.editProfile(result).subscribe(
            (editProfileResult: User) => {
              this.getProfile(editProfileResult.handle);
              this.notificationService.addNotification(
                NotificationTypes.Success, 'Successfully updated profile');
            },
            (error: HttpErrorResponse) => {
              this.notificationService.addNotification(
                NotificationTypes.Danger, 'Could not edit profile');
            });
        }
      });
  }

  public postBlat(): void {
    this.feedService.postBlatz(this.message).subscribe(
      () => {
        this.message = '';
        this.getBlatzByHandle(this.loggedInUser.handle);
      },
      (error) => {
        console.error('error:' + error);
      }
    );
  }

  private getProfile(handle: string): void {
    this.profileService.getProfile(handle).subscribe(
      (user: User) => {
        this.user = user;
        this.getBlatzByHandle(this.user.handle);
      },
      (error: HttpErrorResponse) => {
        this.notificationService.addNotification(
          NotificationTypes.Danger, `Could not retrieve profile for ${this.user.handle}`);
      });
  }
}

@Component({
  selector: 'app-profile-edit-dialog',
  templateUrl: 'profile-edit-dialog.html'
})
export class EditProfileDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  public onClick(): void {
    this.dialogRef.close(this.data);
  }
  public onNoClick(): void {
    this.dialogRef.close();
  }

}

