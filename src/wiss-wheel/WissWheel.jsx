/* eslint-disable */
import React from 'react'
import AnimateHeight from 'react-animate-height'
import ButtonRing from './ButtonRing.jsx'
import ButtonArm from './ButtonArm.jsx'
import ContentBody from './ContentBody.jsx'
import Instructions from './Instructions'
import Utils from './Utils.js'

/**
 * The arm that flies off the wheel, either vertically or horizontally.
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class WISSWheel extends React.Component {
  static HEIGHT = 850
  static WIDTH = 850

  rings = null
  armConfigs = []
  count = -1
  transformStyles = {}
  childTransform = ''
  heightCaptureElem = React.createRef()
  armLW = ButtonArm.ARM_LAYER_WIDTH
  armLH = ButtonArm.ARM_LAYER_HEIGHT
  wrapper = React.createRef()
  childTransformSM = `translate(${this.armLW / 2 - 42},${this.armLH / 2 -
    473}) rotate(90)`
  childTransformLG = `translate(${this.armLW / 2 - 40},${this.armLH / 2 -
    471}) rotate(0)`

  state = {
    selectedRingIndex: -1,
    selectedButtonIndex: -1,
    returnAll: false,
    wheelScale: 0,
    ringProps: [
      { rotation: 0 },
      { rotation: 0 },
      { rotation: 0 },
      { rotation: 0 },
    ],
    armPhaseSlots: [],
    animPhase: null,
    animDuration: -1,
    animPhaseIndex: -1,
    phase: null,
  }

  ringConfigs = [
    {
      radius: 121,
      thickness: 59,
      buttonConfigs: [
        { color: '#58595B', textColor: '#fff', redirectClick: 1 },
        {
          color: '#58595B',
          textColor: '#fff',
          label: 'Families',
        },
        { color: '#58595B', textColor: '#fff', redirectClick: 1 },
        { color: '#58595B', textColor: '#fff', redirectClick: 1 },
      ],
    },
    {
      radius: 200,
      thickness: 100,
      buttonConfigs: [
        { color: '#E74F3D', textColor: '#fff', label: 'Early Learning' },
        { color: '#44797B', textColor: '#fff', label: 'Elementary' },
        { color: '#162D54', textColor: '#fff', label: 'Middle School' },
        { color: '#FFBF3C', textColor: '#000', label: 'High School' },
      ],
    },
    {
      radius: 287.5,
      thickness: 75,
      buttonConfigs: [
        { color: '#FFFFFF' },
        {
          color: '#B1B3B6',
          textColor: '#fff',
          label: 'SEL for Adults',
        },
        { color: '#B1B3B6', redirectClick: 1 },
        { color: '#B1B3B6', redirectClick: 1 },
      ],
    },
    {
      radius: 362.5,
      thickness: 75,
      buttonConfigs: [
        { redirectClick: 1 },
        {
          color: '#E4E1DC',
          textColor: '#000',
          label: 'Out-of-School Time',
        },
      ],
    },
  ]

  constructor(props) {
    super(props)
  }

  /**
   *
   */
  handleRingClick = (ringIndex, btnIndex) => {
    if (
      ringIndex === this.state.selectedRingIndex &&
      btnIndex === this.state.selectedButtonIndex
    )
      return

    this.count++

    let stateMod = null
    let duration = -1
    let rotation

    const appState = {
      selectedRingIndex: ringIndex,
      selectedButtonIndex: btnIndex,
    }

    let ringConfig,
      buttonConfig,
      hasRedirect,
      ringProps,
      shimmedBtnIndex,
      shimmedBtnConfig

    if (ringIndex + btnIndex >= 0) {
      ringConfig = this.ringConfigs[ringIndex]
      buttonConfig = ringConfig.buttonConfigs[btnIndex]
      hasRedirect =
        buttonConfig && typeof buttonConfig.redirectClick !== 'undefined'
      ringProps = this.state.ringProps
      shimmedBtnIndex = hasRedirect ? buttonConfig.redirectClick : btnIndex
      shimmedBtnConfig = ringConfig.buttonConfigs[shimmedBtnIndex]
    } else {
      ringConfig = {}
      buttonConfig = {}
      hasRedirect = false
      ringProps = []
      shimmedBtnIndex = -1
      shimmedBtnConfig = -1
    }

    // Maps it from button position to it's index in CMS.
    this.state.ringProps.map((ring, index) => {
      rotation = ring.rotation || 0
      const isSelectedRing = index === ringIndex
      const ringDiff = ringIndex !== -1 ? Math.abs(ringIndex - index) : 0

      if (isSelectedRing) {
        if (index === 1) {
          let mod = Math.abs(rotation % 360)

          let angles = [360, 360, 360, 360]

          // KEEP: This makes the buttons rotate so clicked button is angled toward arm.
          // Decided against this as quadrant proximity represents relationships between products.
          // Rotation shift misrepresents this.
          // switch (mod) {
          //   case 0:
          //     angles = [360, 90, 180, 270]
          //     break
          //   case 90:
          //     angles = [270, 360, 90, 180]
          //     break
          //   case 180:
          //     angles = [180, 270, 360, 90]
          //     break
          //   case 270:
          //     angles = [90, 180, 270, 360]
          //     break
          //   default:
          //     console.error(`Whoops, something's jacked! Remainder: ${mod}`)
          // }

          let delta = angles[btnIndex]
          rotation = rotation - delta
          duration = 4 * delta + 600
          ringProps[index] = {
            isSelectedRing: isSelectedRing,
            rotation: rotation,
            appState: appState,
            ringDiff: ringDiff,
            animDuration: duration,
            updateTrigger: Utils.makeId(),
            ...stateMod,
          }
        } else {
          rotation = rotation - 720
          duration = 500 * ringDiff + 2000
          ringProps[index] = {
            isSelectedRing: isSelectedRing,
            rotation: rotation,
            appState: appState,
            ringDiff: ringDiff,
            animDuration: duration,
            updateTrigger: Utils.makeId(),
            ...stateMod,
          }
        }
      } else {
        rotation = rotation - 360
        duration = 300 * ringDiff + 1200
        ringProps[index] = {
          isSelectedRing: isSelectedRing,
          rotation: rotation,
          appState: appState,
          ringDiff: ringDiff,
          animDuration: duration,
          updateTrigger: Utils.makeId(),
          ...stateMod,
        }
      }
    })

    if (shimmedBtnIndex !== -1) {
      this.armConfigs.push({
        instanceIndex: this.count,
        htmlId: 'FixedArm' + this.count,
        buttonIndex: shimmedBtnIndex,
        color: shimmedBtnConfig.color,
        label: shimmedBtnConfig.label,
        radius: 200,
        ringIndex: ringIndex,
        textColor: buttonConfig.textColor,
        thickness: 100,
        key: Utils.makeId(),
      })
    } else {
      this.armConfigs.push({
        instanceIndex: this.count,
        buttonIndex: -1,
        ringIndex: -1,
        key: Utils.makeId(),
      })
    }

    if (this.armConfigs.length < 2) {
      this.armConfigs.unshift({
        instanceIndex: this.count,
        buttonIndex: -1,
        ringIndex: -1,
        key: Utils.makeId(),
      })
    }

    if (this.armConfigs.length > 2) this.armConfigs.shift()

    let armDelay

    switch (ringIndex) {
      case 1:
        // First because this ring is most likely clicked.
        switch (btnIndex) {
          case 0:
            armDelay = 1050
            break
          case 1:
            armDelay = 1950
            break
          case 2:
            armDelay = 0
            break
          case 3:
            armDelay = 400
            break
          default:
            throw new Error(`Whoops, something's jacked! Remainder: ${mod}`)
        }
        break
      case 0:
        armDelay = 400
        break
      case 2:
        armDelay = 400
        break
      case 3:
        armDelay = 400
        break
      case -1:
        console['log'](`That's ok. I understand.`)
        break
      default:
        throw new Error(`Whoops, something's jacked! ringIndex: ${ringIndex}`)
    }

    // Arms launch from different point on desktop, so add to timing to account for that.
    if (window.innerWidth < 990) {
      if (ringIndex === 1) {
        armDelay += 450
      } else {
        armDelay += 300
      }
    }

    this.armConfigs.map(config => {
      config.delay = armDelay
    })

    setTimeout(() => {
      this.setState({
        selectedRingIndex: ringIndex,
        selectedButtonIndex: shimmedBtnIndex,
        returnAll: false,
        ringProps: ringProps,
      })
    }, 0)

    this.setState({
      selectedRingIndex: ringIndex,
      selectedButtonIndex: shimmedBtnIndex,
      returnAll: false,
      ringProps: ringProps,
    })

    clearTimeout(this.enterTO)
    this.enterTO = setTimeout(() => {
      this.setState({})
    }, 0)

    clearTimeout(this.resetTO)
    this.resetTO = setTimeout(() => {
      this.setState({
        returnAll: true,
      })
    }, 2200)
  }

  /**
   *
   */
  handleResize = () => {
    const ratio = window.innerWidth / 850
    let scale = Math.min(ratio, 0.8)
    scale = window.innerWidth > 990 ? 0.69 : scale

    this.transformStyles = {
      transform: `scale(${scale})`,
    }

    // IMPORTANT: This retrains scale on resize.
    if (scale !== this.state.scale) {
      this.setState({ wheelScale: scale })
    }
  }

  /**
   *
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  /**
   *
   */
  componentDidUpdate(prepProps, prevState) {
    const height = this.heightCaptureElem.offsetHeight
    if (height !== this.state.height) {
      this.setState({ height: height })
    }
  }

  /**
   *
   */
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()

    // inView('.someSelector').once('enter', doSomething);

    // This is only to do with the into.
    if (this.state.animPhase === null) {
      setTimeout(() => {
        this.setState({
          animPhase: 'wiss-intro',
          animPhaseIndex: 0,
          animDuration: 1000,
        })
        setTimeout(() => {
          // Use 'wiss-introComplete' until another state becomes necessary.
          // But this wont be set here. For now it's symbolic anyways.
          this.setState({
            animPhase: 'wiss-introComplete',
            animPhaseIndex: 1,
            animDuration: 0,
          })
        }, 1000)
      }, 2000)
    }
  }

  /**
   *
   */
  render() {
    const selectedRingIndex = this.state.selectedRingIndex
    const selectedButtonIndex = this.state.selectedButtonIndex

    const appState = {
      selectedRingIndex: selectedRingIndex,
      selectedButtonIndex: selectedButtonIndex,
    }

    const rings = this.ringConfigs.map((config, i) => {
      return (
        <ButtonRing
          style={{ display: 'none' }}
          index={i}
          id={`ring${i}`}
          key={`ring${i}`}
          handleRingClick={this.handleRingClick}
          config={{ ...config, ringIndex: i }}
          orientationShim={this.state.orientationShim}
          animPhase={this.state.animPhase}
          rotation={this.state.ringProps[i].rotation}
          animDuration={this.state.ringProps[i].animDuration}
          updateTrigger={this.state.ringProps[i].updateTrigger}
          isSelectedRing={this.state.ringProps[i].isSelectedRing}
          returnAll={this.state.returnAll}
        />
      )
    })

    const buttonArms = this.armConfigs.map((config, index) => {
      config.slot = index
      if (config.buttonIndex < 0) {
        // Just a generic placeholder to keep the order of things.
        return <g key={config.key} />
      } else {
        return (
          <ButtonArm
            instanceIndex={config.instanceIndex}
            slot={config.slot}
            key={config.key}
            keyProp={config.key}
            delay={config.delay}
            thickness={100}
            tweenRadius={200}
            config={config}
            appState={appState}
            htmlId={config.htmlId}
          />
        )
      }
    })

    const armLW = ButtonArm.ARM_LAYER_WIDTH
    const armLH = ButtonArm.ARM_LAYER_HEIGHT

    const resetActive =
      this.armConfigs[1] &&
      this.armConfigs[1].buttonIndex + this.armConfigs[1].buttonIndex > -2
    const resetBtnClass = resetActive
      ? 'wiss-active-reset'
      : 'wiss-inactive-reset'

    return (
      <div
        id="wiss-wheel-wrapper"
        className={this.state.animPhase}
        ref={this.wrapper}
      >
        <AnimateHeight duration={500} height={this.state.height}>
          <div
            className="wiss-align"
            ref={heightCaptureElem => {
              this.heightCaptureElem = heightCaptureElem
            }}
          >
            <div className="wiss-interactive-wheel">
              <Instructions />
              <div className="wiss-transform" style={this.transformStyles}>
                <div className="wiss-wheel-clipping">
                  <div
                    id="wiss-center-reset-button"
                    className={`${resetBtnClass} wiss-introItem`}
                    onClick={() => this.handleRingClick(-1, -1)}
                  >
                    <div id="wiss-reset-text">RESET</div>
                    <img
                      className="wiss-child"
                      src="https://images.ctfassets.net/98bcvzcrxclo/2xVkPDCubsQByaDwioRJBj/b1593f5b01eb62a0bb9b449b6d63ca9d/child-figure.svg"
                    />
                  </div>
                  {rings}
                  <svg className="wiss-overlay-layer"></svg>
                </div>
                <svg
                  className="wiss-arm-layer"
                  style={{ width: armLW, height: armLH }}
                  viewBox={`-${armLW / 2} -${armLW / 2} ${armLW} ${armLH}`}
                >
                  <g transform="rotate(-90)">{buttonArms}</g>
                </svg>
              </div>
            </div>
            <ContentBody
              ringIndex={this.state.selectedRingIndex}
              buttonIndex={this.state.selectedButtonIndex}
              wheelScale={this.state.wheelScale}
            ></ContentBody>
          </div>
        </AnimateHeight>
        <div class="wiss-are-you-kidding-me"></div>
      </div>
    )
  }
}
