import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;

  ringConfigs = [
    { radius: 100, thickness: 50, buttonConfigs: [{label: "Families", color: "#555"}, {color: ""}, {color: ""}, {color: ""}] },
    { radius: 150, thickness: 75, buttonConfigs: [{label: "Elementary", color: ""}, {label: "Middle School", color: ""}, {label: "HighSchool", color: ""}, {label: "Early Learning", color: ""}]},
    { radius: 100, thickness: 150, buttonConfigs: [{label: "SEL for Adults", color: ""}, {color: ""}, {color: ""}]},
    { radius: 100, thickness: 250, buttonConfigs: [{label: "Out-of-School Time", color: ""}]},
  ];

  constructor() {
    super();
    console.log('asdfasdf');
  }

  render() {
    return <svg className="wiss-wheel" viewBox={WissWheel.VIEWBOX} xmlns="http://www.w3.org/2000/svg" width={WissWheel.HEIGHT} height={WissWheel.WIDTH}>
      <g>
        <ButtonRing id="ring1" config={this.ringConfigs[0]} />
        <ButtonRing id="ring2" config={this.ringConfigs[1]} />
        <ButtonRing id="ring3" config={this.ringConfigs[2]} />
        <ButtonRing id="ring4" config={this.ringConfigs[3]} />
      </g>
    </svg>
  }
}
