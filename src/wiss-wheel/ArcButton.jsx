import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import ButtonLabel from './ButtonLabel';
import WISSWheel from './WISSWheel';
import './ArcButton.scss';

export default class ArcButton extends React.Component {

  static circlePath(cx, cy, r, sweep = 1) {
    return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,${sweep} ${r * 2},0`;
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

  render() {

    const config = this.props.config;

    // TODO: Make most of this into class properties?
    const thickness = (this.state.inSelectedRing) ? 100 : config.thickness;
    const color = config.color;
    const radius = config.radius;
    const ringIndex = config.ringIndex;
    const btnIndex = this.props.config.buttonIndex;
    const randColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
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

                let style = (color === "#FFFFFF") ? { pointerEvents: 'none' } : {};
                const rotation = this.props.config.buttonIndex * 90;
                let path = (typeof color !== "undefined") ?
                  <path
                    className="wiss-arc-button"
                    onClick={this.handleClick}
                    id={circPathId}

                    d={ArcButton.circlePath(0, 0, tweenRadius)}
                    stroke={color}
                    strokeWidth={thickness}
                    fill={"none"}
                    style={style}
                  /> : null;
                return (
                  <g transform={`translate(400,400) rotate(${rotation})`}>
                    <clipPath id={clipId}>
                      {clip}
                    </clipPath>

                    {/* {clip} */}
                    <g clipPath={clipRef}>
                      {path}
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
