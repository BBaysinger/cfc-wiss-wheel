import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  constructor(props) {
    super();
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
      <circle cx="0" cy="0" r={radius} stroke={color} strokeWidth={thickness} fill="transparent" />
      <rect width={outerRadius} height={outerRadius} style={{ opacity: 0.6, fill: randColor, transform: transform }} />
    </g>
  }
}
