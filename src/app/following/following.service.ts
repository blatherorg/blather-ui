import { RestConstants } from './../common/constants/rest';
import { FollowingUser } from './../types/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowingService {


  constructor(private http: HttpClient) { }

  public getFollowed(userId: string): Observable<FollowingUser[]> {
    return this.http.get<FollowingUser[]>(`${RestConstants.FOLLOWING_URL}/${userId}`);
  }
}
