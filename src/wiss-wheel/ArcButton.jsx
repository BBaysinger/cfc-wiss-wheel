import React from 'react';

import ButtonLabel from './ButtonLabel';

export default class ArcButton extends React.Component {

  static circlePath(cx, cy, r, sweep = 1) {
    return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,${sweep} ${r * 2},0`;
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
    const outerRadius = radius + (thickness / 2);
    const idInts = config.ringIndex + "-" + btnIndex;
    const circPathId = "circ" + idInts;
    const clipId = "clipRect" + idInts;
    const clipRef = `url(#${clipId})`;

    let clip = null;
    let arc = null;

    // if (btnIndex === 0 && config.ringIndex === 1) {
    if (true) {
      // Moved components here so we can conditionally create them in order to analyze.

      clip = <rect
        width={outerRadius}
        height={outerRadius * 2}
        y={-outerRadius}
        style={{ opacity: 0.6, fill: randColor, transform: "rotate(-179deg)" }}
      />

      // console.log(clipRef, clipId);

      arc = <path
        id={circPathId}
        clipPath={clipRef}
        d={cwCircPath}
        stroke={color}
        strokeWidth={thickness}
        fill="transparent"
      />
    }

    return <g className="wiss-arc-button" style={{ transform: `rotate(${btnIndex * 90}deg)` }}>

      <clipPath id={clipId}>
        {clip}
      </clipPath>

      {/* {clip} */}

      <g>
        {arc}
      </g>

      <g style={{ transform: "rotate(-45deg)" }}>
        <ButtonLabel config={config} />
      </g>
    </g>
  }
}
