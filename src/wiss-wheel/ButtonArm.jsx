import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import Utils from './Utils.js';

import './ButtonArm.scss';

export default class ButtonArm extends React.Component {

  /** 
   * 
   */
  static ARM_LENGTH = 1000;
  /** 
   * 
   */
  static TEST_MODE = false;

  /** 
   * 
   */
  static armPath(leg, radius) {
    return `M${-leg},-${radius} L0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`;
  }
  /** 
   * 
   */
  static textPos(radius) {
    return ButtonArm.ARM_LENGTH + ((radius * 2) * Math.PI) / 8;
  }

  /** 
   * 
   */
  id = null;
  /** 
   * 
   */
  testId = null;
  /** 
   * 
   */
  isSelected = false;

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }

  render() {

    const config = this.props.config;

    const btnIndex = config.buttonIndex;
    const ringIndex = config.ringIndex;

    this.id = (config.idMod) ? config.idMod : `wissArm_${ringIndex}_${btnIndex}`;

    // Distinguish between primary and testing paths (both contained here).
    this.testId = `${this.id}_TEST`;

    const clipId = "clipRect" + this.id;
    const clipRef = `url(#${clipId})`;

    const textColor = config.textColor;
    const appState = this.props.appState;

    const selectedRingIndex = appState.selectedRingIndex;
    const selectedButtonIndex = appState.selectedButtonIndex;

    this.isSelected = btnIndex === selectedButtonIndex && ringIndex === selectedRingIndex;

    const maskYIntermediatePos = -780;
    const maskYStartPos = this.state ? maskYIntermediatePos : -1200;
    const maskHeightIntermediatePos = 700;
    const maskHeightStartPos = this.state ? maskHeightIntermediatePos : 400;

    const textIntermediatePos = 500;
    const textStartPos = this.state ? textIntermediatePos : 400;

    return (

      <Animate
        start={() => {
          return {
            maskY: this.isSelected ? ButtonArm.textPos(this.props.tweenRadius) : maskYStartPos,
            maskHeight: this.isSelected ? ButtonArm.textPos(this.props.tweenRadius) : maskHeightStartPos,
            textOffset: this.isSelected ? ButtonArm.textPos(this.props.tweenRadius) : textStartPos,
          }
        }}
        update={() => {
          // if (this.props.index === 0) console.log(this.state);
          return ({
            maskY: [this.isSelected ? maskYIntermediatePos : -1100],
            maskHeight: [this.isSelected ? maskHeightIntermediatePos : 200],
            textOffset: [this.isSelected ? textIntermediatePos : 200],
            timing: { delay: 250, duration: 1000, ease: easeExpOut },
          })
        }}
      >
        {(state1) => {

          // const { textOffset, maskHeight, maskY } = state1;
          const { textOffset, maskY } = state1;

          let testText = null;
          let testPath = null;

          if (ButtonArm.TEST_MODE) {

            testPath = <path
              className="wiss-button-arm-test"
              id={this.testId}
              d={ButtonArm.armPath(ButtonArm.ARM_LENGTH, this.props.tweenRadius)}
              stroke={Utils.randRGBA(0.4)}
              fill={Utils.randRGBA(0.2)}
              strokeWidth={20}
            />

            testText = <textPath
              startOffset={'700px'}
              xlinkHref={`#${this.testId}`}
              fill={textColor}
            >

              {this.props.uid}-{this.id}
              {/* {config.label} {/* KEEP: For testing. */}
              {/* {selectedRingIndex} {/* KEEP: For testing. */}
              {/* {selectedButtonIndex} {/* KEEP: For testing. */}
              {this.props.tweenRadius} {/* KEEP: For testing.
              {/* {textOffset} {/* KEEP: For testing. */}

            </textPath>
          }

          const strokeColor = config.color;
          const thickness = this.props.thickness;

          let translate = '';

          if (ButtonArm.TEST_MODE) {
            // const translate = typeof this.props.slot !== 'undefined' ? `translate(0,0)` : '';
            translate = typeof this.props.slot !== 'undefined' ? `translate(0,${this.props.slot * 110})` : '';
          }

          return (
            <g transform={translate}>
              <g clipPath={clipRef}>
                <path
                  className="wiss-button-arm"
                  id={this.id}
                  d={ButtonArm.armPath(ButtonArm.ARM_LENGTH, this.props.tweenRadius)}
                  stroke={strokeColor}
                  strokeWidth={thickness}
                  fill='none'
                />
                {testPath}
                <text className="wiss-button-arm" dominantBaseline="central">
                  <textPath
                    startOffset={textOffset + 'px'}
                    xlinkHref={`#${this.id}`}
                    fill={textColor}
                  >
                    {config.label}
                  </textPath>
                  {testText}
                </text>
              </g>
              <clipPath id={clipId}>
                <rect x={maskY - 800} y="-400" width="1200" height="400" style={{ fill: "rgba(0,0,0,0.25)" }} />
              </clipPath>
            </g>
          )
        }}
      </Animate>
    )
  }
}