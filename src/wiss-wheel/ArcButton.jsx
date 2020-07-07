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

    // TODO: Make most of this into class properties?
    const thickness = config.thickness;
    // const color = "red"; //config.color;
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
    /* This is maybe a little complicated, as these helped mask outer buttons to not show in gaps of smaller rings. */
    const style = (config.color === "transparent" || config.color === "#FFFFFF") ? { display: "none" } : {};
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

    return <g className="wiss-arc-button" style={{ ...style }}>

      <clipPath id={clipId}>
        {clip}
      </clipPath>

      {/* {clip} */}

      <g>
        {arc}
      </g>

      <g clipPath={clipRef}>
        <ButtonLabel config={config} />
      </g>
    </g>
  }
}
