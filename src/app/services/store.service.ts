import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { pluck, shareReplay, tap } from 'rxjs/operators';
import { BallRandom, State } from './../models/ball.model';
import { ApiService } from './api.service';
import { StateService } from './state.service';

@Injectable()
export class StoreService {
  private store: State[] = [];
  private active: State;

  constructor(public api: ApiService, private state: StateService) {
    this.state.getState().subscribe(data => {
      if (data.hex) {
        this.store.push(data)
      }
    });
  }

  getStore() {
    return this.store;
  }

  setActive(active) {
    this.active = active;
  }

  getActive() {
    return this.active;
  }

  getStoreNext() {    
    return this.store.filter(e => {
      const temp = this.calcPosition();
      return e.position[0] == temp[0] && e.position[1] == temp[1];
    })[0]; 
  }

  setPosition() {
    return this.active.position.length === 0 ? [0, 0] : this.calcPosition();
  }

  calcPosition() {
    const weight = this.active.position.reduce((ac, val, i) => {
      let temp = i == 0 && val == 1 ? val+1 : val;
      return ac + temp;
    }, 0);

    switch(weight) {
      case 0:
        return [0, 1];
      case 1:
        return [1, 1];
      case 2:
        return [0, 0];
      case 3:
        return [1, 0];
    }
  }
}