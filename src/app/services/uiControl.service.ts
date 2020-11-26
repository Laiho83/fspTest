import { StateService } from './state.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from './api.service';
import { UIControls } from '../models/ball.model';


@Injectable()
export class UiControlService implements OnDestroy {
  private unsubscribe$ = new Subject;
  private uiControls: UIControls;
  private active;
  
  constructor(public api: ApiService, public state: StateService) {
    this.uiControls = {
      top: '0%',
      left: '0%',
      background: '',
      offset: `translate(0,0)`
    }
    this.state.getActiveState()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(e => {
        this.active = e;
        this.uiActiveControls(e)
      });
  }

  uiActiveControls(act) {
    this.uiControls.top = `${act.position[0] * 100}%`;
    this.uiControls.left = `${act.position[1] * 100}%`;
    this.uiControls.background = `${act.hex}`;
    this.uiControls.offset = `translate(-${this.uiControls.left}, -${this.uiControls.top})`
  }

  getActiveControls() {
    return this.uiControls;
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

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
