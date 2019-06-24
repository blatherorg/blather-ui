import { UsersComponent } from './users/users.component';
import { LoginTabComponent } from './login/login-tab/login-tab.component';
import { RegisterTabComponent } from './login/register-tab/register-tab.component';
import { AuthGuard } from './login/auth.guard';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { BlatformComponent } from './blatform/blatform.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: FeedComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { page: 'login' } },
  { path: 'register', component: LoginComponent, data: { page: 'register' } },
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'blatform', component: BlatformComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:handle', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
