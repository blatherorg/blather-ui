import { ErrorInterceptor } from './login/error.interceptor';
import { JwtInterceptor } from './login/jwt.interceptor';
import { LoginTabComponent } from './login/login-tab/login-tab.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatListModule, MatToolbarModule, MatMenuModule,
  MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatTabsModule, MatSelectModule, MAT_LABEL_GLOBAL_OPTIONS, 
  MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS, ShowOnDirtyErrorStateMatcher, ErrorStateMatcher} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FeedComponent } from './feed/feed.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterTabComponent } from './login/register-tab/register-tab.component';
import { UsersComponent } from './users/users.component';
import { BlatformComponent } from './blatform/blatform.component';
import { ProfileComponent, EditProfileDialogComponent } from './profile/profile.component';
import { TrendingComponent } from './trending/trending.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { NotificationComponent } from './notification/notification.component';
import { FollowingComponent } from './following/following.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    RegisterTabComponent,
    LoginTabComponent,
    UsersComponent,
    BlatformComponent,
    ProfileComponent,
    EditProfileDialogComponent,
    TrendingComponent,
    NotificationComponent,
    FollowingComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    ScrollDispatchModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    EditProfileDialogComponent,
    NotificationComponent,
    ChangePasswordComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
