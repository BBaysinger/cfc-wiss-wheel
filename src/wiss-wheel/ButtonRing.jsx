import React from 'react'

import { Animate } from 'react-move'
import { easeQuadOut } from 'd3-ease'

import ArcButton from './ArcButton.jsx'
import Utils from './Utils.js'

/**
 *
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class ButtonRing extends React.Component {
  static HORIZONTAL_LAYOUT_BREAKPOINT = 991

  ringIndex = null
  reverseRingIndex = null
  randomX = Math.random() * 100
  btnIds = [0, 0, 0, 0].map(() => Utils.makeId(10))
  once = false

  state = { orientationShim: 0 }

  constructor(props) {
    super(props)

    const config = this.props.config
    this.ringIndex = config.ringIndex
  }

  /**
   *
   *
   * @memberof ButtonRing
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   *
   *
   * @memberof ButtonRing
   */
  handleResize = () => {
    // let orientation = window.innerWidth > 990 && this.ringIndex === 1 ? -90 : 0
    let orientation = this.ringIndex === 1 ? 0 : 0

    if (this.state.orientationShim !== orientation) {
      this.setState({ orientationShim: orientation })
    }
  }

  /**
   *
   *
   * @memberof ButtonRing
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  /**
   *
   *
   * @readonly
   * @memberof ButtonRing
   */
  get rotation() {
    return this.props.rotation + this.state.orientationShim
  }

  /**
   *
   *
   * @memberof ButtonRing
   */
  handleButtonClick = (ringIndex, buttonIndex) => {
    this.props.handleRingClick(this.ringIndex, buttonIndex, this.state.rotation)
  }

  /**
   *
   *
   * @returns
   * @memberof ButtonRing
   */
  render() {
    const config = this.props.config

    return (
      <Animate
        start={() => ({
          radius:
            !this.props.isSelectedRing || this.props.returnAll
              ? config.radius
              : 200,
          thickness: config.thickness,
        })}
        update={() => {
          return {
            radius: [
              this.props.isSelectedRing && !this.props.returnAll
                ? 200
                : config.radius,
            ],
            thickness: [
              this.props.isSelectedRing && !this.props.returnAll
                ? 100
                : config.thickness,
            ],
            timing: { delay: 0, animDuration: 0 },
          }
        }}
      >
        {state1 => {
          const { radius, thickness } = state1

          return (
            <Animate
              start={() => ({
                rotation: -90,
              })}
              update={() => {
                return {
                  rotation: [
                    !this.props.animPhase === 'wiss-introComplete'
                      ? this.rotation
                      : this.rotation,
                  ],
                  timing: {
                    duration: this.props.animDuration,
                    ease: easeQuadOut,
                  },
                }
              }}
            >
              {state2 => {
                const { rotation } = state2

                const style = {
                  zIndex: this.props.isSelectedRing ? 100 : 'auto',
                  transform: `rotate(${rotation}deg)`,
                }

                const btns = config.buttonConfigs.map((config, i) => {
                  let tempConfig = { ...config }
                  delete tempConfig.buttonConfigs
                  tempConfig = {
                    ...tempConfig,
                    ...config,
                    ringIndex: this.ringIndex,
                    buttonIndex: i,
                  }

                  return (
                    <ArcButton
                      id={`button${i}`}
                      radius={radius}
                      thickness={thickness}
                      key={this.btnIds[i]}
                      handleClick={this.handleButtonClick}
                      config={tempConfig}
                      animPhase={this.props.animPhase}
                      appState={this.props.appState}
                    />
                  )
                })

                return (
                  <svg
                    className={`wiss-button-ring wiss-button-ring${this.ringIndex}`}
                    style={style}
                  >
                    {btns}
                  </svg>
                )
              }}
            </Animate>
          )
        }}
      </Animate>
    )
  }
}
