import { RestConstants } from './../common/constants/rest';
import { User, RegisterUser } from './../types/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { CommonUtilsService } from '../common/common-utils.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInUserSubject: BehaviorSubject<User>;
  public loggedInUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
    this.loggedInUserSubject = new BehaviorSubject<User | null>(this.jwtToUser(localStorage.getItem('token')));
    this.loggedInUser = this.loggedInUserSubject.asObservable();
   }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(RestConstants.LOGIN_URL, {email: email, password: password})
      .pipe(map(jwt => {
        // login successful if there's a jwt token in the response
        if (jwt && jwt.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', jwt.token);
            const user: User = this.jwtToUser(jwt.token);
            this.loggedInUserSubject.next(user);
        }
        return jwt;
    }));
  }

  public registerUser(user: RegisterUser): Observable<any> {
    return this.http.post<any>(RestConstants.REGISTER_URL, user, { observe: 'response' }).pipe(catchError(CommonUtilsService.handleRestError));
  }

  public changePassword(handle: string, oldPassword: string, newPassword: string): Observable<any> {
    const body: { handle: string, oldPassword: string, newPassword: string } = {
      handle: handle,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.put<any>(RestConstants.CHANGE_PASSWORD_URL, body)
  }

  public logoutServiceCall(): Observable<any> {
    return this.http.post<any>(RestConstants.LOGOUT_URL, {});
  }

  public logout(): void {
    // remove user from local storage to log user out
    this.notificationService.dismissAllNotifications();
    localStorage.removeItem('token');
    this.loggedInUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  public getLoggedInUser(): Observable<User> {
    return this.loggedInUser;
  }

  public get loggedInUserValue(): User {
    return this.loggedInUserSubject.value;
}

  private jwtToUser(jwt: string): User | null {
    if (jwt) {
      const jwtClaims = jwt_decode(jwt);
      return {
        handle: jwtClaims.handle,
        email: jwtClaims.email,
        firstName: jwtClaims.firstName,
        lastName: jwtClaims.lastName
      };
    } else {
      console.log('no jwt found');
      return;
    }
  }
}
