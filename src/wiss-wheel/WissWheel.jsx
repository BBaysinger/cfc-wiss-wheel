import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;

  ringConfigs = [
    {
      radius: 123, thickness: 60, buttonConfigs: [
        { label: "Families", color: "#58595B" }, { color: "#58595B" }, { color: "#58595B" }, { color: "#58595B" }]
    },
    {
      radius: 200, thickness: 100, buttonConfigs: [
        { label: "Early Learning", color: "#E74F3D" },
        { label: "Elementary", color: "#44797B" },
        { label: "Middle School", color: "#44797B" },
        { label: "HighSchool", color: "#FFBF3C" }
      ]
    },
    {
      radius: 290, thickness: 80, buttonConfigs: [
        { label: "SEL for Adults", color: "#B1B3B6" },
        { label: "", color: "#B1B3B6" },
        { label: "", color: "#B1B3B6" }
      ]
    },
    {
      radius: 360, thickness: 80, buttonConfigs: [
        { label: "Out-of-School Time", color: "#E4E1DC" }
      ]
    },
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
