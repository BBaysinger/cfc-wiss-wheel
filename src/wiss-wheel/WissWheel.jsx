import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;

  buttonData = [
    { radius: 100, stroke: 50, ids: ["Families", "", "", ""] },
    { radius: 150, stroke: 75, ids: ["Elementary", "Middle School", "HighSchool", "Early Learning"] },
    { radius: 100, stroke: 150, ids: ["SEL for Adults", "", ""] },
    { radius: 100, stroke: 250, ids: ["Out-of-School Time"] },
  ];

  constructor() {
    super();
  }

  render() {
    return <svg className="wiss-wheel" viewBox={WissWheel.VIEWBOX} xmlns="http://www.w3.org/2000/svg" width={WissWheel.HEIGHT} height={WissWheel.WIDTH}>
      <g>
        <ButtonRing id="ring1" data={this.buttonData[0]} />
        <ButtonRing id="ring2" data={this.buttonData[1]} />
        <ButtonRing id="ring3" data={this.buttonData[2]} />
        <ButtonRing id="ring4" data={this.buttonData[3]} />
      </g>
    </svg>
  }
}
