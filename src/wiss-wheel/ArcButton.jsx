import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class Button extends React.Component {

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
    </g>
  }
}
