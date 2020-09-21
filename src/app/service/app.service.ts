import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'https://us-central1-aforo-41bbd.cloudfunctions.net/';
  
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE, HEAD"
    })
  };

  constructor(private http: HttpClient) { }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  post(url, data): Observable<any> {
    const api = `${this.api}${url}`;
    const param = {data: data};
    return this.http.post(api, param, this.httpOptions)
    .pipe(
      catchError(this.errorHandl)
      // retry(3)
    );
  }

  put(url, data): Observable<any>{
    const api = `${this.api}${url}`;
    const param = {data: data};
    return this.http.put(api, param)
    .pipe(
      catchError(this.errorHandl)
    );
  }
  
}
