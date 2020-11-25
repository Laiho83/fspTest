import { StoreService } from './../../services/store.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { StateService } from './../../services/state.service';



@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss'],
})
export class BallComponent implements OnInit {

  top: string = '0%';
  left: string = '0%';
  background: string = '';
  offset: string = `translate(${this.top}, ${this.left})`;

  constructor(
    public api: ApiService,
    public state: StateService,
    public store: StoreService,
  ) {
    this.ballAction();
  }

  ngOnInit(): void {
    this.state.getState().subscribe(e => {
      this.store.setActive(e);
      this.top = `${this.store.getActive().position[0] * 100}%`;
      this.left = `${this.store.getActive().position[1] * 100}%`;
      this.background = `${this.store.getActive().hex}`;
      this.offset = `translate(-${this.left}, -${this.top})`
    });
  }

  ballAction() {
    this.store.getStore().length < 4 ? this.getBallData() : this.getBallState(this.store.getStoreNext());
  }

  getBallData() {
    this.api.getBallRandom().subscribe((e: any) => {
      this.getBallState(e);
    });
  }

  getBallState(e) {
    this.state.setState({
      hex: e.hex,
      position: this.store.setPosition(),
    });

  }
}
