import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';
import Child from '../images/child.svg';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;

  state = {
    phase: 'wiss-intro',
  }

  rings = [];

  ringConfigs = [
    {
      radius: 121, thickness: 59, buttonConfigs: [
        { color: "#58595B" },
        { color: "#58595B", textColor: '#fff', label: "Families" },
        { color: "#58595B" },
        { color: "#58595B" },
      ]
    },
    {
      radius: 200, thickness: 100, buttonConfigs: [
        { color: "#E74F3D", textColor: '#fff', label: "Early Learning" },
        { color: "#44797B", textColor: '#fff', label: "Elementary" },
        { color: "#162D54", textColor: '#fff', label: "Middle School" },
        { color: "#FFBF3C", textColor: '#000', label: "High School" },
      ]
    },
    {
      radius: 287.5, thickness: 75, buttonConfigs: [
        {},
        { color: "#B1B3B6", textColor: '#fff', label: "SEL for Adults" },
        { color: "#B1B3B6" },
        { color: "#B1B3B6" },
      ]
    },
    {
      radius: 362.5, thickness: 75, buttonConfigs: [
        {},
        { color: "#E4E1DC", textColor: '#000', label: "Out-of-School Time" },
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

  componentDidMount() {
    setTimeout(() => { this.setState({ phase: '' }) }, 1000);
  }

  render() {
    return <svg className="wiss-interactive-wheel" viewBox={WissWheel.VIEWBOX} xmlns="http://www.w3.org/2000/svg" width={WissWheel.HEIGHT} height={WissWheel.WIDTH}>
      {/* <g style={{ transform: "rotate(-90deg)" }}><!-- Rotated here so config indexes align logially with button orientation. --> */}
      <g className={`wiss-wheel ${this.state.phase}`}>
        {this.rings}
      </g>
      <g>
        <circle cx="0" cy="0" r="92" stroke="black" strokeWidth="0" fill="white" />
        <image x="-40" y="-70" height="138" xlinkHref={Child} />
      </g>
    </svg>
  }
}
