import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import { LoginService } from '../login.service';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
import { PasswordStrengthValidator, PasswordMatchValidator, BlatherFormErrors } from '../../common/error-state-matchers';
import { NotificationService } from '../../notification/notification.service';
import { NotificationTypes } from '../../types/notification';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private hideOldPassword: boolean = true;
  private hideNewPassword1: boolean = true;
  private hideNewPassword2: boolean = true;


  public changePasswordForm: FormGroup;
  public blatherFormErrors = BlatherFormErrors;
  // public passwordMatchErrorMatcher = new PasswordMatchErrorMatcher();
  oldPasswordCtrl: FormControl;
  newPassword1Ctrl: FormControl;
  newPassword2Ctrl: FormControl;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private loginService: LoginService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.oldPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.newPassword1Ctrl = this.formBuilder.control('', [Validators.required, Validators.minLength(8), PasswordStrengthValidator]);
    this.newPassword2Ctrl = this.formBuilder.control('', Validators.required);


    this.changePasswordForm = this.formBuilder.group({
      oldPassword: this.oldPasswordCtrl,
      newPassword1: this.newPassword1Ctrl,
      newPassword2: this.newPassword2Ctrl
    }, { validator: PasswordMatchValidator });
  }

  private changePassword(): void {
    if (this.changePasswordForm.valid) {
      //const u = { ...this.newUser, ...this.newUserForm.value };
      this.loginService.changePassword(this.data.handle, this.changePasswordForm.value.oldPassword, this.changePasswordForm.value.newPassword1).subscribe(() => {
        // success
        this.loginService.logoutServiceCall().subscribe(() => {
          this.notificationService.addNotification(NotificationTypes.Info, 'User password has been changed');
        }, () => {
          console.error('Error calling logout service');
        }, () => {
          this.loginService.logout();
        })
        this.closeDialog();
      }, (err: HttpErrorResponse) => {
        this.notificationService.addNotification(NotificationTypes.Danger, JSON.stringify(err));
      });
    }
  }

  private closeDialog(): void {
    this.dialogRef.close();
  }
}
