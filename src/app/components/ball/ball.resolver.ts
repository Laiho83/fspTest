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
    private state: StateService,
    private store: StoreService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this._apiService
    .getBallRandom().subscribe(
      (e: BallRandom) => {
        if(e.hex) {
          this.state.setState({
            hex: e.hex,
            position: this.store.setPosition(),
          });
        } else {
          return EMPTY;
        }
        return e;
      },
    );
  }
}
