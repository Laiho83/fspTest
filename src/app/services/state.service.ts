import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from './../models/ball.model';
import { ApiService } from './api.service';

@Injectable()
export class StateService {
  
  private state: BehaviorSubject<State> = new BehaviorSubject<State>({
    hex: '',
    position: [],
  });

  constructor(public api: ApiService) {
  }

  getState(): BehaviorSubject<State> {
    return this.state;
  }

  setState(newState: State) {
    this.state.next(newState);
  }
}