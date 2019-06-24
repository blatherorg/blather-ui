import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Feed } from './feed';
import { RestConstants } from '../common/constants/rest';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  public getBlatz(): Observable<Feed[]> {
    return this.http.get<Feed[]>(RestConstants.BLATZ_URL);
  }

  public getBlatzByHandle(handle: string): Observable<Feed[]> {
    return this.http.get<Feed[]>(`${RestConstants.BLATZ_URL}/${handle}`);
  }

  public postBlatz(message: string): Observable<any> {
    return this.http.post<any>(RestConstants.BLATZ_URL, { message: message });
  }
}
