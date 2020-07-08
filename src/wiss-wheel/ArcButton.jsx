import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import ButtonLabel from './ButtonLabel';
import WissWheel from './WissWheel';
import './ArcButton.scss';

export default class ArcButton extends React.Component {

  static circlePath(cx, cy, r, sweep = 1) {
    return `M ${cx} ${cy} m -${r}, 0 a ${r},${r} 0 1,${sweep} ${r * 2},0`;
  }

  state = { inSelectedRing: false };

  handleClick = () => {
    this.props.handleClick(this.props.config.ringIndex, this.props.config.buttonIndex);
  }

  update = () => {
    this.setState({ inSelectedRing: WissWheel.selected_ring_index === this.props.config.ringIndex })
  }

  render() {

    const config = this.props.config;

    // TODO: Make most of this into class properties?
    const thickness = config.thickness;
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

    // if (btnIndex === 1 && config.ringIndex === 3) {
    if (true) {
      // Keep rect here to analyze by populating into mulitiple points.
      clip = <rect
        className="wiss-button-clip"
        width={Math.max(250, outerRadius)}
        height={Math.max(250, outerRadius)}
        style={{
          opacity: 0.6,
          fill: randColor,
        }}
      />
    }

    return <g className="wiss-arc-button" style={{ ...style }}>
      <clipPath id={clipId}>
        {clip}
      </clipPath>

      {/* {clip} */}

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
        {(state) => {
          const { tweenRadius } = state;

          let style = (color === "#FFFFFF") ? { pointerEvents: 'none' } : {};
          let path = (typeof color !== "undefined") ? <path
            className="wiss-arc-button"
            onClick={this.handleClick}
            id={circPathId}
            clipPath={clipRef}
            d={ArcButton.circlePath(0, 0, tweenRadius)}
            stroke={color}
            strokeWidth={thickness}
            fill={'transparent'}
            style={style}
          /> : null;

          return (<g>
            {path}
          </g>)
        }}
      </Animate>

      <g clipPath={clipRef}>
        <ButtonLabel config={config} />
      </g>
    </g>
  }
}
