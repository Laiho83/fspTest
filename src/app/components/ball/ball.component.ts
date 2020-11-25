import { BallRandom } from './../../models/ball.model';
import { StoreService } from './../../services/store.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StateService } from './../../services/state.service';
import { Observable, Subject } from 'rxjs';
import { ActivationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject;

  top: string = '0%';
  left: string = '0%';
  background: string = '';
  offset: string = `translate(${this.top}, ${this.left})`;

  constructor(
    public api: ApiService,
    public state: StateService,
    public store: StoreService,
  ) {
  
  }

  ngOnInit(): void {
    this.state.getState()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(e => {
      this.store.setActive(e);
      this.setBallData(e);
    });
  }

  ballAction() {
    this.store.getStore().length < 4 ? this.getBallData() : this.getBallState(this.store.getStoreNext());
  }

  getBallData() {
    this.api.getBallRandom()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((e: BallRandom) => {
        this.getBallState(e);
    });
  }

  getBallState(e) {
    this.state.setState({
      hex: e.hex,
      position: this.store.setPosition(),
    });
  }

  setBallData(e) {    
    this.top = `${this.store.getActive().position[0] * 100}%`;
    this.left = `${this.store.getActive().position[1] * 100}%`;
    this.background = `${this.store.getActive().hex}`;
    this.offset = `translate(-${this.left}, -${this.top})`
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
