import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;

  rings = [];

  ringConfigs = [
    {
      radius: 123, thickness: 60, buttonConfigs: [
        { color: "#58595B" },
        { color: "#58595B", label: "Families" },
        { color: "#58595B" },
        { color: "#58595B" }
      ]
    },
    {
      radius: 200, thickness: 100, buttonConfigs: [
        { color: "#E74F3D", label: "Early Learning" },
        { color: "#44797B", label: "Elementary" },
        { color: "#162D54", label: "Middle School" },
        { color: "#FFBF3C", label: "HighSchool" }
      ]
    },
    {
      radius: 287.5, thickness: 75, buttonConfigs: [
        {},
        { color: "#B1B3B6", label: "SEL for Adults" },
        { color: "#B1B3B6" },
        { color: "#B1B3B6" }
      ]
    },
    {
      radius: 362.5, thickness: 75, buttonConfigs: [
        {},
        { color: "#E4E1DC", label: "Out-of-School Time" }
      ]
    },
  ];

  constructor(props) {
    super(props);

    let key;

    for (var i = 0; i < this.ringConfigs.length; i++) {
      key = "ring" + i;
      this.rings[i] = <ButtonRing id={key} key={key} config={{ ...this.ringConfigs[i], ringIndex: i }} />
    }
  }

  render() {
    return <svg className="wiss-wheel" viewBox={WissWheel.VIEWBOX} xmlns="http://www.w3.org/2000/svg" width={WissWheel.HEIGHT} height={WissWheel.WIDTH}>
      <g style={{ transform: "rotate(-90deg)" }}>
        <g>
          {this.rings}
        </g>
      </g>
    </svg>
  }
}
