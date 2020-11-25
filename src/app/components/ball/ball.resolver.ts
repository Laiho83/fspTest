import { BallRandom } from './../../models/ball.model';
import { StoreService } from './../../services/store.service';
import { StateService } from './../../services/state.service';
import { Injectable, ɵConsole } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';

@Injectable()
export class BallResolver implements Resolve<any> {
  constructor(
    private _apiService: ApiService,
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this._apiService
    .getBallRandom().
      pipe(
        map((e: BallRandom) => {
          if(!e.hex) {
            return EMPTY;
          }
          return {
            hex: e.hex,
            position: []
          };
        },)
      )    
  }
}
