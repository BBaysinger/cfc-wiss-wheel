import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  static circlePath(cx, cy, r) {
    return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r +
      ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
  }

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const config = this.props.config;

    const thickness = config.thickness;
    const color = config.color;
    const radius = config.radius;
    const circPath = ArcButton.circlePath(0, 0, radius);
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const transform = `rotate(${config.buttonIndex * 90 - 90}deg)`;
    const outerRadius = radius + (thickness / 2);
    const idInts = this.props.config.ringIndex + "-" + this.props.config.buttonIndex;
    const circPathId = "circ" + idInts;
    const clipId = "clipRect" + idInts;
    const clipRef = `url(#${clipId})`;

    return <g>
      <clipPath id={clipId}>
        <rect width={outerRadius} height={outerRadius} style={{ fill: randColor, transform: transform }} />
      </clipPath>
      <path id={circPathId} d={circPath} fill="transparent" />
      <circle cx="0" cy="0" clipPath={clipRef} r={radius} stroke={color} strokeWidth={thickness} fill="transparent" />
      <ButtonLabel config={config} />
    </g>
  }
}
