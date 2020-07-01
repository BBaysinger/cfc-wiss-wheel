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
    const ringIndex = config.ringIndex;
    const cwCircPath = ArcButton.circlePath(0, 0, radius);
    const btnIndex = this.props.config.buttonIndex;
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    const outerRadius = radius + (thickness / 2);
    const idInts = ringIndex + "-" + btnIndex;
    const circPathId = "circ" + idInts;
    const clipId = "clipRect" + idInts;
    const clipRef = `url(#${clipId})`;
    const transitionDelay = ringIndex * 0.6 + config.buttonIndex * 0.50 + 1;

    let clip = null;
    let arc = null;

    // if (btnIndex === 1 && config.ringIndex === 3) {
      if (true) {
      // Moved components here so we can conditionally instantiate to analyze.

      clip = <rect
        className="wiss-button-clip"
        width={outerRadius}
        height={outerRadius}
        style={{
          opacity: 0.6,
          fill: randColor,
          transitionDelay: `${transitionDelay}s`,
        }}
      />

      arc = <path
        id={circPathId}
        clipPath={clipRef}
        d={cwCircPath}
        stroke={color}
        strokeWidth={thickness}
        fill={color}
      />
    }

    return <g className="wiss-arc-button" style={{ transform: `rotate(${btnIndex * 90}deg)` }}>

      <clipPath id={clipId}>
        {clip}
      </clipPath>

      {/* Leave for testing. */}
      {/* {clip} */}

      <g>
        {arc}
      </g>

      {/* <g style={{ transform: "rotate(-45deg)" }}>
        <ButtonLabel config={config} />
      </g> */}
    </g>
  }
}
