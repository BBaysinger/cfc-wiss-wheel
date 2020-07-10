import React from 'react';

import './ButtonLabel.scss';

export default class ButtonLabel extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const config = this.props.config;

    const idInts = config.ringIndex + "-" + config.buttonIndex;
    const circPathId = "circ" + idInts;
    const label = config.label;
    const textColor = config.textColor;

    return <text className="wiss-arc-button-label" transform="rotate(-45)" dominantBaseline="central">
      <textPath startOffset="50%"
        xlinkHref={`#${circPathId}`}
        fill={textColor}
        style={{ textAnchor: "middle" }}
      >{label}</textPath>
    </text>
  }
}
