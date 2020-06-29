import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  static circlePath(cx, cy, r, sweep = 1) {
    return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,${sweep} ${r * 2},0 a ${r},${r} 0 1,${sweep} -${r * 2},0`;
  }

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const config = this.props.config;

    const thickness = config.thickness;
    const color = config.color;
    const radius = config.radius;
    const cwCircPath = ArcButton.circlePath(0, 0, radius);
    const btnIndex = this.props.config.buttonIndex;
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const clipRot = `rotate(${btnIndex * 90 - 90}deg)`;
    const textRot = `rotate(${btnIndex * 90 - 45}deg)`;
    const outerRadius = radius + (thickness / 2);
    const idInts = config.ringIndex + "-" + btnIndex;
    const circPathId = "circ" + idInts;
    const clipId = "clipRect" + idInts;
    const clipRef = `url(#${clipId})`;

    return <g className="arc-button">

      <clipPath id={clipId}>
        <rect width={outerRadius} height={outerRadius} style={{ fill: randColor, transform: clipRot }} />
      </clipPath>

      <g clipPath={clipRef}>
        <path id={circPathId} d={cwCircPath} stroke={color} strokeWidth={thickness} fill="transparent" />
        {/* <circle cx="0" cy="0" clipPath={clipRef} r={radius} stroke={color} strokeWidth={thickness} fill="transparent" /> */}
      </g>

      <g style={{ transform: textRot }}>
        <ButtonLabel config={config} />
      </g>
    </g>
  }
}
