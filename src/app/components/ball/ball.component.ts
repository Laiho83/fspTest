import { BallRandom } from './../../models/ball.model';
import { StoreService } from './../../services/store.service';
import { Component, OnDestroy } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StateService } from './../../services/state.service';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnDestroy {

  private unsubscribe$ = new Subject;

  top: string = '0%';
  left: string = '0%';
  background: string = '';
  offset: string = `translate(${this.top}, ${this.left})`;
  clickAction: Subject<boolean> = new Subject();

  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public state: StateService,
    public store: StoreService,
  ) {
    this.route.data.subscribe(( {ballData} ) => {
      this.store.setActive(ballData);
      this.getBallState(ballData);
    })
    this.clickEvent();
    this.moveBall();
  }

  clickEvent() {
    this.clickAction
    .pipe(
      takeUntil(this.unsubscribe$),
      throttleTime(1300),
    )
    .subscribe(e => {
      this.store.getStore().length < 4 ? this.getBallData() : this.getBallState(this.store.getStoreNext());
    });
  }

  moveBall() {
    this.state.getState()
    .pipe(
      takeUntil(this.unsubscribe$)      
    )
    .subscribe(e => {
      this.store.setActive(e);
      this.setBallData(e);
    });
  }

  ballAction() {
    this.clickAction.next(true);
  }

  getBallData() {
    this.api.getBallRandom()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
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
