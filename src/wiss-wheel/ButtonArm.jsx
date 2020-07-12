import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import ArcButton from './ArcButton';
import './ButtonArm.scss';

export default class ButtonArm extends React.Component {

  static ARM_LENGTH = 900;

  static armPath(leg, radius) {
    return `M${-leg},-${radius} L0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`;
  }

  static textPos(radius) {
    return ButtonArm.ARM_LENGTH + ((radius * 2) * Math.PI) / 8;
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

      <Animate
        start={() => {
          const txtOffset = ButtonArm.textPos(this.props.tweenRadius);
          return {
            textOffset: txtOffset,
          }
        }}
        update={() => {
          const txtOffset = this.props.isSelectedButton ? ButtonArm.textPos(this.props.tweenRadius) : 600;
          return ({
            textOffset: txtOffset,
            timing: { delay: 250, duration: 2000, ease: easeExpOut },
          })
        }}
      >
        {(state1) => {

          const { textOffset } = state1;

          const selectedRingIndex = this.props.appState.selectedRingIndex;
          const selectedButtonIndex = this.props.appState.selectedButtonIndex;
          const strokeColor = config.color;
          const thickness = this.props.thickness;

          return (
            <g>
              <path
                className="wiss-button-arm"
                id={this.id}
                d={ButtonArm.armPath(ButtonArm.ARM_LENGTH, this.props.tweenRadius)}
                stroke={strokeColor}
                strokeWidth={thickness}
                fill='none'
              />
              <path
                className="wiss-button-arm-test"
                id={this.id}
                d={ButtonArm.armPath(ButtonArm.ARM_LENGTH, this.props.tweenRadius)}
                stroke={ArcButton.randomColor()}
                strokeWidth={20}
                fill='none'
              />
              <text className="wiss-button-arm" dominantBaseline="central">
                <textPath
                  startOffset={textOffset + 'px'}
                  xlinkHref={this.xlink}
                  fill={textColor}
                >
                  {/* {config.label} */}
                </textPath>
                <textPath
                  startOffset={'700px'}
                  xlinkHref={this.xlink}
                  fill={textColor}
                >
                  {/* {config.label}
                  {selectedRingIndex}
                  {selectedButtonIndex}
                  {this.props.tweenRadius} */}
                  {textOffset}
                </textPath>
              </text>
            </g>
          )
        }}
      </Animate>
    )
  }
}
