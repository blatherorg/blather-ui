import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../types/user';
import { RestConstants } from '../common/constants/rest';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  public getProfile(handle: string): Observable<User> {
    return this.http.get<User>(`${RestConstants.USER_URL}/${handle}`);
  }

  public editProfile(user: User): Observable<User> {
    return this.http.put<User>(`${RestConstants.USER_URL}/${user.handle}`, user);
  }
}
