import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import ButtonLabel from './ButtonLabel';
import ButtonArm from './ButtonArm';
import WISSWheel from './WISSWheel';
import './ArcButton.scss';

export default class ArcButton extends React.Component {

  static arcPath(cx, cy, r, sweep = 1) {
    return `m -${r}, 0 a ${r},${r} 0 1,${sweep} ${r * 2},0`;
  }

  static randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  state = {
    inSelectedRing: false,
    intro: false,
  };

  handleClick = () => {
    this.props.handleClick(this.props.config.ringIndex, this.props.config.buttonIndex);
  }

  update = () => {
    this.setState({ inSelectedRing: WISSWheel.selected_ring_index === this.props.config.ringIndex })
  }

  componentDidMount() {

  }

  render() {

    const config = this.props.config;

    // TODO: Make most of this into class properties?
    const thickness = (this.state.inSelectedRing) ? 100 : config.thickness;
    const color = config.color;
    const radius = config.radius;
    const ringIndex = config.ringIndex;
    const btnIndex = this.props.config.buttonIndex;
    const randColor = ArcButton.randomColor();
    const outerRadius = radius + (thickness / 2);
    const idInts = ringIndex + "-" + btnIndex;
    const circPathId = "circ" + idInts;
    const clipId = "clipRect" + idInts;
    const clipRef = `url(#${clipId})`;
    /* This is maybe a little complicated, as these helped mask outer buttons to not show in gaps of smaller rings. */
    const style = {};
    let clip = null;

    return <g className="wiss-arc-button" style={{ ...style }}>

      <Animate
        start={() => ({
          tweenRadius: config.radius,
        })}

        update={() => {
          return ({
            tweenRadius: [this.state.inSelectedRing ? 200 : config.radius],
            timing: { duration: 750, ease: easeExpOut },
          })
        }}
      >
        {(state1) => {

          return (
            <Animate
              start={() => ({
                clipMaskRotation: -270,
              })}

              update={() => {
                return ({
                  clipMaskRotation: [this.state.intro ? -270 : -180],
                  timing: { delay: 1000, duration: 750, ease: easeExpOut },
                })
              }}
            >
              {(state2) => {

                const { clipMaskRotation } = state2;

                // if (btnIndex === 1 && config.ringIndex === 3) {
                if (true) {
                  // Keep rect here to analyze by populating into mulitiple points.
                  clip = <rect
                    className="wiss-button-clip"
                    width={Math.max(250, outerRadius)}
                    height={Math.max(250, outerRadius)}
                    transform={`rotate(${clipMaskRotation})`}
                    style={{
                      opacity: 0.6,
                      fill: randColor,
                    }}
                  />
                }

                const { tweenRadius } = state1;
                const style = (color === "#FFFFFF") ? { pointerEvents: 'none' } : {};
                const rotation = btnIndex * 90;
                let arcPath = null;
                let buttonArm = null;

                if (typeof color !== "undefined") {

                  arcPath = <path
                    className="wiss-arc-button"
                    onClick={this.handleClick}
                    id={circPathId}
                    d={ArcButton.arcPath(0, 0, tweenRadius)}
                    stroke={color}
                    strokeWidth={thickness}
                    fill="none"
                    style={style}
                  />

                  if (typeof this.props.config.label !== "undefined") {

                    // if (this.props.config.buttonIndex === 3) {
                    buttonArm = <ButtonArm
                      tweenRadius={tweenRadius}
                      config={this.props.config}
                    />;
                    // }

                  }
                };
                return (
                  <g transform={`translate(400,400) rotate(${rotation})`}>
                    <clipPath id={clipId}>
                      {clip}
                    </clipPath>
                    {/* {clip} */}
                    <g clipPath={clipRef}>
                      {arcPath}
                    </g>
                    <g transform="rotate(-90)">
                      {buttonArm}
                    </g>
                    <g clipPath={clipRef}>
                      <ButtonLabel config={config} />
                    </g>
                  </g>
                )
              }}
            </Animate>
          )
        }}
      </Animate>
    </g>
  }
}
