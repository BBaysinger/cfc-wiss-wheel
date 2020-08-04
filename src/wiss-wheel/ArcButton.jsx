import React from 'react'

import { Animate } from 'react-move'
import { easeExpOut } from 'd3-ease'

import ButtonLabel from './ButtonLabel.jsx'
import ButtonArm from './ButtonArm.jsx'

/**
 *
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class ArcButton extends React.Component {
  static TEST_MODE = false

  static arcPath(cx, cy, r, sweep = 1) {
    return `m -${r}, 0 a ${r},${r} 0 1,${sweep} ${r * 2},0`
  }

  static randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

  state = {
    inSelectedRing: false,
    intro: false,
    radius: 0,
    thickness: 0,
  }

  handleClick = () => {
    this.props.handleClick(
      this.props.config.ringIndex,
      this.props.config.buttonIndex,
    )
  }

  render() {
    const config = this.props.config
    const thickness = this.props.thickness
    const radius = this.props.radius
    const color = config.color
    const ringIndex = config.ringIndex
    const btnIndex = this.props.config.buttonIndex
    const randColor = ArcButton.randomColor()
    const idInts = ringIndex + '-' + btnIndex
    const circPathId = 'circ' + idInts
    const clipId = 'clipRect' + idInts
    const clipRef = `url(#${clipId})`
    /* This is maybe a little complicated, as these helped mask outer buttons to not show in gaps of smaller rings. */
    const style = {}
    let clip = null

    return (
      <g className="wiss-arc-button" style={{ ...style }}>
        <Animate
          start={() => ({
            tweenRadius: radius,
          })}
          update={() => {
            return {
              tweenRadius: [
                this.state.inSelectedRing && !this.props.appState.returnAll
                  ? 200
                  : radius,
              ],
              timing: { duration: 750, ease: easeExpOut },
            }
          }}
        >
          {state1 => {
            return (
              <Animate
                start={() => ({
                  clipMaskRotation: -271,
                })}
                update={() => {
                  return {
                    clipMaskRotation: [this.props.animPhase ? -180 : -271],
                    timing: { duration: 750, ease: easeExpOut },
                  }
                }}
              >
                {state2 => {
                  const { clipMaskRotation } = state2
                  // Keep rect here to analyze by populating into mulitiple points.
                  clip = (
                    <rect
                      className="wiss-button-clip"
                      x="-1"
                      y="-1"
                      width="425"
                      height="425"
                      transform={`rotate(${clipMaskRotation})`}
                      style={{
                        opacity: 0.0,
                        fill: randColor,
                      }}
                    />
                  )
                  // }
                  const { tweenRadius } = state1
                  // Pointer events MUST be inlined here (in production only for whatever reason).
                  const style =
                    color === '#FFFFFF'
                      ? { pointerEvents: 'none' }
                      : { pointerEvents: 'stroke' }
                  const rotation = btnIndex * 90
                  let arcPath = null
                  let buttonArm = null

                  if (typeof color !== 'undefined') {
                    arcPath = (
                      <path
                        className="wiss-arc-button"
                        onClick={this.handleClick}
                        id={circPathId}
                        d={ArcButton.arcPath(0, 0, tweenRadius)}
                        stroke={color}
                        strokeWidth={thickness + 2}
                        fill="none"
                        style={style}
                      />
                    )

                    if (ArcButton.TEST_MODE && false) {
                      // if (this.props.config.buttonIndex === 3) {
                      if (typeof this.props.config.label !== 'undefined') {
                        buttonArm = (
                          <g transform="rotate(-90)">
                            <ButtonArm
                              thickness={thickness}
                              tweenRadius={tweenRadius}
                              config={this.props.config}
                              appState={this.props.appState}
                            />
                          </g>
                        )
                      }
                    }
                  }
                  return (
                    <g transform={`translate(425,425) rotate(${rotation})`}>
                      <clipPath id={clipId}>{clip}</clipPath>
                      {/* {clip} */}
                      <g clipPath={clipRef}>{arcPath}</g>
                      {buttonArm}
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
    )
  }
}
