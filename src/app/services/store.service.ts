import { Injectable, OnDestroy } from '@angular/core';
import { State } from './../models/ball.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { StateService } from './state.service';
import { UiControlService } from './uiControl.service';


@Injectable()
export class StoreService implements OnDestroy {
  private unsubscribe$ = new Subject;
  private store: State[] = [];
  private active: State;

  constructor(public api: ApiService, private state: StateService, private uiService: UiControlService) {
    this.state.getState().subscribe(data => {
      if (data.hex) {
        this.store.push(data)
      }
    });

    this.state.getActiveState()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(e => {
        this.active = e;
      });
  }

  getStore() {
    return this.store;
  }

  getStoreNext() {
    return this.store.filter(e => {
      const temp = this.uiService.calcPosition();
      return e.position[0] == temp[0] && e.position[1] == temp[1];
    })[0]; 
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}