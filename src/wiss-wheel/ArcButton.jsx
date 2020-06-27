import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const config = this.props.config;

    const thickness = config.thickness;
    const color = config.color;
    const label = config.label;
    const radius = config.radius;
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const transform = 'rotate(' + (config.index * 90) + 'deg)';
    const outerRadius = radius + (thickness / 2);

    return <g>
      <ButtonLabel label={label} />

      <clipPath id="clipRect" clipPathUnits="objectBoundingBox">
        <rect width={outerRadius - 152} height={outerRadius - 152} style={{ opacity: 0.6, fill: randColor, transform: transform }} />
      </clipPath>

      {/* <circle clipPath="url(#clipRect)" cx="0" cy="0" r={radius} stroke={color} strokeWidth={thickness} fill="transparent" /> */}
      <circle cx="0" cy="0" r={radius} stroke={color} strokeWidth={thickness} fill="transparent" />
    </g>
  }
}
