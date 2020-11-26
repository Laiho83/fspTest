import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UIControls } from '../models/ball.model';


@Injectable()
export class UiControlService {
  private uiControls: UIControls;

  constructor(public api: ApiService) {
    this.uiControls = {
      top: '0%',
      left: '0%',
      background: '',
      offset: `translate(0,0)`
    }
  }

  uiActiveControls(act) {
    this.uiControls.top = `${act.position[0] * 100}%`;
    this.uiControls.left = `${act.position[1] * 100}%`;
    this.uiControls.background = `${act.hex}`;
    this.uiControls.offset = `translate(-${this.uiControls.left}, -${this.uiControls.top})`
  }

  setActiveControls(active) {
    this.uiActiveControls(active)
  }

  getActiveControls() {
    return this.uiControls;
  }
}
