import { APP_CONFIG } from './../config/app.config';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { BallRandom } from './../models/ball.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    public router: Router
  ) {

  }

  getBallRandom() {
    return this.http.get(APP_CONFIG.apiurl).pipe(
      map((e: any) => {
        return new BallRandom(e);
      }),
      catchError(err => {
        console.log('Error API ', err.message);
        return of([]);
      })
    );
  }
}