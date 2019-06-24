import { RestConstants } from './../common/constants/rest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http: HttpClient) { }

  public getTrending(startTime: number): Observable<string[]> {
    return this.http.get<string[]>(`${RestConstants.TRENDING_URL}?startTime=${startTime}`);
  }
}
