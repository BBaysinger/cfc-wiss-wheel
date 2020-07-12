import React from 'react';

import ArcButton from './ArcButton';
import './ButtonArm.scss';

export default class ButtonArm extends React.Component {

  static ARM_LENGTH = 900;

  static armPath(leg, radius) {
    return `M${-leg},-${radius} L0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`;
  }

  static textPos(raduis) {
    return ButtonArm.ARM_LENGTH + ((raduis * 2) * Math.PI) / 8;
  }

  id = null;
  xlink = null;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.id = `wissArm${this.props.config.ringIndex}-${this.props.config.buttonIndex}`;
    this.xlink = `#${this.id}`;
  }

  render() {

    const config = this.props.config;
    const textColor = config.textColor;

    return (
      <g>
        <path
          className="wiss-button-arm"
          id={this.id}
          d={ButtonArm.armPath(ButtonArm.ARM_LENGTH, this.props.tweenRadius)}
          stroke={ArcButton.randomColor()}
          strokeWidth={20}
          fill='none'
        />
        <text className="wiss-button-arm" dominantBaseline="central">
          <textPath
            startOffset={ButtonArm.textPos(this.props.tweenRadius)}
            xlinkHref={this.xlink}
            fill={textColor}
          // style={{ textAnchor: "middle" }}
          >
            {config.label}
          </textPath>
        </text>
      </g>
    )
  }
}
