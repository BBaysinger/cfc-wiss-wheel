import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import Utils from './Utils';
import './ButtonArm.scss';

export default class ButtonArm extends React.Component {

  /** 
   * 
   */
  static ARM_LENGTH = 900;
  /** 
   * 
   */
  static TEST_MODE = true;

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

  // constructor(props) {
  //   super(props);
  // }

  componentDidUpdate() {

  }

  render() {

    const config = this.props.config;

    const btnIndex = config.buttonIndex;
    const ringIndex = config.ringIndex;

    this.id = (config.idMod) ? config.idMod : `wissArm_${ringIndex}_${btnIndex}`;

    // Distinguish between primary and testing paths (both contained here).
    this.testId = `${this.id}_TEST`;

    const textColor = config.textColor;
    const appState = this.props.appState;

    const selectedRingIndex = appState.selectedRingIndex;
    const selectedButtonIndex = appState.selectedButtonIndex;

    this.isSelected = btnIndex === selectedButtonIndex && ringIndex === selectedRingIndex;

    return (

      <Animate
        start={() => {
          const txtOffset = 600;
          return {
            textOffset: txtOffset,
          }
        }}
        update={() => {
          if (this.id.indexOf('Fixed0') !== -1) { console.log(this.isSelected, this.id) }
          const txtOffset = [this.isSelected ? 600 : ButtonArm.textPos(this.props.tweenRadius)];
          return ({
            textOffset: txtOffset,
            timing: { delay: 250, duration: 1000, ease: easeExpOut },
          })
        }}
      >
        {(state1) => {

          const { textOffset } = state1;

          let testText = null;
          let testPath = null;

          if (ButtonArm.TEST_MODE) {

            const selectedRingIndex = this.props.appState.selectedRingIndex; // KEEP: For testing.
            const selectedButtonIndex = this.props.appState.selectedButtonIndex; // KEEP: For testing.

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
              {/* {this.props.tweenRadius} {/* KEEP: For testing. */}
              {/* {textOffset} {/* KEEP: For testing. */}

            </textPath>
          }

          const strokeColor = config.color;
          const thickness = this.props.thickness;

          const translate = typeof this.props.index !== 'undefined' ? `translate(0,${this.props.index * 110})` : '';

          return (
            <g transform={translate}>
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
              <rect x="-800" y="-400" width="1200" height="400" style={{ fill: "rgba(0,50,200,0.5)" }} />
            </g>
          )
        }}
      </Animate>
    )
  }
}