import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    const thickness = this.props.config.thickness;
    const color = this.props.config.color;
    const label = this.props.config.label;
    const radius = this.props.config.radius;

    return <g>
      <ButtonLabel label={label} />
      <circle cx="0" cy="0" r={radius} stroke={color} strokeWidth={thickness} fill="transparent" />
      <rect width="500" height="100" style={{ fill: 'rgb(0,0,255)', strokeWwidth: 3, stroke: 'red' }} />
    </g>
  }
}
