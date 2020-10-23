import React from "react";

import { Animate } from "react-move";
import { easeCubicOut } from "d3-ease";

import Utils from "./Utils.js";

/**
 * The arm that flies off the wheel, either vertically or horizontally.
 *
 * TODO: The numbers in here are hard to understand, and should be named better.
 * Good luck to anyone cracking in later on, but this was devved under a time crunch.
 *
 * Y coordinates are from the left. It's just how the path was originally drawn.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class ButtonArm extends React.Component {

  /**
   *
   *
   * @static
   * @memberof ButtonArm
   */
  static ARM_LAYER_HEIGHT = 1657;

  /**
   *
   *
   * @static
   * @memberof ButtonArm
   */
  static ARM_LAYER_WIDTH = 850;

  /**
   *
   *
   * @static
   * @memberof ButtonArm
   */
  static TEST_MODE = false;

  /**
   *
   *
   * @memberof ButtonArm
   */
  htmlId = null;

  /**
   *
   *
   * @memberof ButtonArm
   */
  testId = null;

  /**
   *
   *
   * @memberof ButtonArm
   */
  slideStarted = false;

  /**
   *
   *
   * @memberof ButtonArm
   */
  state = {};

  /**
   *
   *
   * @static
   * @param {*} leg
   * @param {*} radius
   * @returns
   * @memberof ButtonArm
   */
  static armPath(leg, radius) {
    return `M${-leg},-${radius} L0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`;
  }

  /**
   * Maybe not needed if the arms with always be the same length.
   *
   * @static
   * @param {*} radius
   * @returns
   * @memberof ButtonArm
   */
  static textPos(radius) {
    return ButtonArm.RESTING_ARM_BOTTOM + (radius * 2 * Math.PI) / 8;
  }

  /**
   *
   *
   * @readonly
   * @memberof ButtonArm
   */
  get restingTextPos() {
    let retVal;
    if (this.state.slot === 0) retVal = window.innerWidth > 990 ? -110 : -100;
    else retVal = window.innerWidth > 990 ? 279.5 : 920;
    return retVal;
  }

  /**
   * Changes in the path length affect positioning, so we need to be careful and lock
   * it down because it gets confusing fast with the animation and masking. On desktop,
   * it's harder to mask horizontally, so we just use a shorter arm. On mobile, the
   * layout flexes around a single arm length masked however, so content can expand
   * its containers vertically as needed.
   *
   * @readonly
   * @memberof ButtonArm
   */
  get buttonArmLength() {
    let retVal = window.innerWidth > 990 ? 1000 : 1500;
    return retVal;
  }

  /**
   *
   *
   * @param {*} prevProps
   * @param {*} prevState
   * @memberof ButtonArm
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.slot !== this.state.slot) {
      this.setState({ ...this.props });
    }
  }

  /**
   *
   *
   * @returns
   * @memberof ButtonArm
   */
  render() {
    const config = this.props.config;
    // Distinguish between primary and testing paths (both contained here).
    this.testId = `${config.htmlId}_TEST`;
    const clipId = "clipRect" + config.htmlId;
    const armPathId = "armPath" + config.htmlId;
    const testPathId = "testPath" + config.htmlId;
    const textColor = config.textColor;
    // TODO: Figure out why delay is sometimes NaN.
    const delay = !isNaN(this.props.delay) ? this.props.delay : 0;
    const maskY =
      this.state.slot === 0 ? (window.innerWidth > 990 ? -1570 : -2000) : -1002;

    return (
      <Animate
        start={() => {
          const retVal = {
            maskY: 250,
            maskHeight: 150,
            textOffset: 1156,
          };
          return retVal;
        }}
        update={() => {
          const retVal = {
            maskY: [maskY],
            maskHeight: [560],
            textOffset: [this.restingTextPos],
            timing: { delay: delay, duration: 1200, ease: easeCubicOut },
          };
          return retVal;
        }}
      >
        {(state1) => {
          const { textOffset, maskY, maskHeight } = state1;

          let testText = null;
          let testPath = null;
          let testRect = null;

          if (ButtonArm.TEST_MODE) {
            testPath = (
              <path
                className="wiss-button-arm-test"
                id={`${testPathId}`}
                d={ButtonArm.armPath(
                  this.buttonArmLength,
                  this.props.tweenRadius
                )}
                stroke={Utils.randRGBA(0.4)}
                fill={Utils.randRGBA(0.2)}
                strokeWidth={20}
                style={{ opacity: 0.25 }}
              />
            );

            testText = (
              <textPath
                startOffset={"200px"}
                xlinkHref={`#${testPathId}`}
                fill={textColor}
              >
                {clipId} {this.htmlId}
                {/* {this.props.id}-{this.id}  */}
                {/* {config.label} {/* KEEP: For testing. */}
                {/* {selectedRingIndex} {/* KEEP: For testing. */}
                {/* {selectedButtonIndex} {/* KEEP: For testing. */}
                {this.props.tweenRadius}{" "}
                {/* KEEP: For testing.
                {/* {textOffset} {/* KEEP: For testing. */}
              </textPath>
            );
            testRect = (
              <rect
                x={maskY}
                y="-260"
                width={maskHeight}
                height="260"
                style={{ fill: "rgba(0,0,0,0.25)" }}
              />
            );
          }

          const strokeColor = config.color;
          const thickness = this.props.thickness + 2;

          let translate = "";
          let style = {};

          if (ButtonArm.TEST_MODE) {
            style = { opacity: 0.25 };
            translate =
              typeof this.state.slot !== "undefined"
                ? `translate(0,${this.state.slot * 110})`
                : "";
          }

          return (
            <g transform={translate}>
              <g clipPath={`url(#${clipId})`}>
                {/* <g> */}
                <path
                  className="wiss-button-arm"
                  id={`${armPathId}`}
                  d={ButtonArm.armPath(
                    this.buttonArmLength,
                    this.props.tweenRadius
                  )}
                  stroke={strokeColor}
                  strokeWidth={thickness}
                  fill="none"
                  style={style}
                />
                {testPath}
                <text
                  className="wiss-button-arm"
                  alignmentBaseline="middle"
                  dominantBaseline="central"
                >
                  <textPath
                    startOffset={textOffset + "px"}
                    xlinkHref={`#${armPathId}`}
                    fill={textColor}
                  >
                    {config.label}
                  </textPath>
                  {testText}
                </text>
              </g>
              {testRect}
              <clipPath id={clipId}>
                <rect
                  x={maskY}
                  y="-425"
                  width={maskHeight}
                  height="425"
                  style={{ fill: "rgba(0,0,0,0.25)" }}
                />
              </clipPath>
            </g>
          );
        }}
      </Animate>
    );
  }
}
