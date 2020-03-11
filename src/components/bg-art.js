import {
  Pt,
  Group,
  Line,
  Create,
  Shaping,
  Curve,
  Geom,
  Num
} from "pts/dist/es5"

import { PtsCanvas } from "react-pts-canvas"

// TODO: Make it so that when resizing the window, the animation is not "redrawn". Not sure how to do this!

export class AnimationExample extends PtsCanvas {

  constructor() {
    super();
    this.noiseGrid = [];
  }

  _create() {
    // Create a line and a grid, and convert them to `Noise` points
    let gd = Create.gridPts( this.space.innerBound, 20, 20 );
    this.noiseGrid = Create.noisePts( gd, 0.05, 0.1, 20, 20 );
  }

  componentDidUpdate() {
    if (this.props.pause) {
      this.space.pause();
    } else {
      this.space.resume();
    }
  }


  // Override PtsCanvas' start function
  start(space, bound) {
    this._create();
  }


  // Override PtsCanvas' resize function
  resize() {
    this._create();
  }


  // Override PtsCanvas' animate function
  animate(time, ftime) {

    if (!this.noiseGrid) return;

    // Generate noise in a grid
    this.noiseGrid.forEach( (p) => {
      p.step( 0.01, 0.01 );
      this.form.fillOnly("#123").point( p, Math.abs( p.noise2D() * this.space.size.x/18 ), "circle" );
    });

  }

}


export { AnimationExample as default }
