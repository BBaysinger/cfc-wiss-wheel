import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;

  ringConfigs = [
    { radius: 100, thickness: 60, buttonConfigs: [{ label: "Families", color: "#555" }, { color: "" }, { color: "" }, { color: "" }] },
    { radius: 200, thickness: 100, buttonConfigs: [{ label: "Early Learning", color: "#E74F3D" }, { label: "Elementary", color: "" }, { label: "Middle School", color: "" }, { label: "HighSchool", color: "" }] },
    { radius: 280, thickness: 80, buttonConfigs: [{ label: "SEL for Adults", color: "" }, { color: "" }, { color: "" }] },
    { radius: 260, thickness: 80, buttonConfigs: [{ label: "Out-of-School Time", color: "" }] },
  ];

  // constructor() {
  //   super();
  // }

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
