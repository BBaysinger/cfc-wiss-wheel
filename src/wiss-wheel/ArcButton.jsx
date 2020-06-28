import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const config = this.props.config;

    const thickness = config.thickness;
    const color = config.color;
    const label = config.label;
    const radius = config.radius;
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const transform = `rotate(${config.buttonIndex * 90 - 90}deg)`;
    const outerRadius = radius + (thickness / 2);
    const idInts = this.props.config.ringIndex + "-" + this.props.config.buttonIndex;
    const circId = "circ" + idInts;
    const clipId = "clipRect" + idInts;
    const clipRef = `url(#${clipId})`;

    return <g>
      <ButtonLabel label={label} />

      <clipPath id={clipId}>
        <rect width={outerRadius} height={outerRadius} style={{ fill: randColor, transform: transform }} />
      </clipPath>

      <circle id={circId} clipPath={clipRef} cx="0" cy="0" r={radius} stroke={color} strokeWidth={thickness} fill="transparent" />
      <textPath startOffset="50%" xlinkHref={`#${circId}`} style={{ textAnchor: "middle" }}>{label}</textPath>
    </g>
  }
}
