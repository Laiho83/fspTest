import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { BallRandom, UIControls } from './../../models/ball.model';
import { StoreService } from './../../services/store.service';
import { ApiService } from './../../services/api.service';
import { StateService } from './../../services/state.service';
import { UiControlService } from './../../services/uiControl.service';
import { Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';


@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnDestroy {

  private unsubscribe$ = new Subject;
  private clickAction: Subject<boolean> = new Subject();
  public uiControls: UIControls;

  constructor(
    public route: ActivatedRoute,
    public api: ApiService,
    public stateService: StateService,
    public storeService: StoreService,
    public uiServis: UiControlService,
  ) {
    this.route.data.subscribe(( {ballData} ) => {
      this.storeService.setActive(ballData);
      this.uiServis.setActiveControls(ballData);
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
      this.storeService.getStore().length < 4 ? this.getBallData() : this.getBallState(this.storeService.getStoreNext());
    });
  }

  moveBall() {
    this.stateService.getState()
    .pipe(
      takeUntil(this.unsubscribe$)      
    )
    .subscribe(e => {
      this.storeService.setActive(e);
      this.uiServis.setActiveControls(e);
      this.setUiControls(e);
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
    this.stateService.setState({
      hex: e.hex,
      position: this.storeService.setPosition(),
    });
  }

  setUiControls(e) {
    this.uiControls = this.uiServis.getActiveControls();
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
