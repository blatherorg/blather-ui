import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class CommonUtilsService {
  public static gmtToLocal(time: number): number {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return time + (offset * 60);
  }

  public static localToGmt(time: number): number {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return time - (offset * 60);
  }

  public static handleRestError(error: HttpErrorResponse): Observable<never> {
    //Error handling template copied from angular.io
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else if (error.status) {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    } else {
      console.error('UI ERROR: ' + JSON.stringify(error));
    }
    // User-facing error message
    return throwError(error);
  }
}
