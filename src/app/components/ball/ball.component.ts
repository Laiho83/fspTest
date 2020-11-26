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
    public uiService: UiControlService,
  ) {
    this.route.data
    .pipe(
      takeUntil(this.unsubscribe$),
    )
    .subscribe(( {ballData} ) => {
      this.stateService.setActiveState(ballData)
      this.setBallState(ballData);
    })
    this.clickEvent();
    this.moveBall();
  }

  /**
   * Tiggered on click: 
   *  Throttle time to prevent double clicks.
   *  Calling the colr.spi or retriving data from store.
  */
  clickEvent() {
    this.clickAction
    .pipe(
      takeUntil(this.unsubscribe$),
      throttleTime(1300),
    )
    .subscribe(e => {
      this.storeService.getStore().length < 4 ? this.getBallData() : this.setBallState(this.storeService.getStoreNext());
    });
  }

  /**
   * Moves the ball: sets the data for DOM manipulation.
  */
  moveBall() {
    this.stateService.getState()
    .pipe(
      takeUntil(this.unsubscribe$)      
    )
    .subscribe(e => {
      this.stateService.setActiveState(e)
      this.setUiControls(e);
    });
  }

  /**
   * Tiggered on click event: 
  */
  ballAction() {
    this.clickAction.next(true);
  }

  /**
   * Retrivies ball data from colr.api and calls ball state.
  */
  getBallData() {
    this.api.getBallRandom()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((e: BallRandom) => {
        this.setBallState(e);
    });
  }

  /**
   * Sets the next state of the ball
  */
  setBallState(e) {
    this.stateService.setState({
      hex: e.hex,
      position: this.uiService.setPosition(),
    });
  }

  /**
   * Sets all data we need to move the ball: top, left, background, offset
  */
  setUiControls(e) {
    this.uiControls = this.uiService.getActiveControls();
  }

  /**
   * Unsebscribe from subscriptions.
  */
  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
