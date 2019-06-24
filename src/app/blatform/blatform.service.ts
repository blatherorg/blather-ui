import { RestConstants } from './../common/constants/rest';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlatformService {

  constructor(private http: HttpClient, private router: Router) {
   }

  public sendBlat(blatText: string, blatUser: string): Observable<any> {
    return this.http.post<any>(RestConstants.BLATZ_URL, {blatId: "", message: blatText, creator: blatUser, timestamp:""});
      //.pipe(map(jwt => {
      //  // login successful if there's a jwt token in the response
      //  if (jwt && jwt.token) {
      //      // store user details and jwt token in local storage to keep user logged in between page refreshes
      //      localStorage.setItem('token', jwt.token);
      //      const user: User = this.jwtToUser(jwt.token);
      //      this.loggedInUserSubject.next(user);
      //  }
      //  return jwt;
    //}));
  }
}
