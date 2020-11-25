export class BallRandom {
  hex: string;
  constructor(obj) {
    this.hex = isNaN(obj.colors[0].hex) ? `#${obj.colors[0].hex}` : '#575a4c';
  }
}

export interface State {
  hex?: string,
  position?: number[];
}

