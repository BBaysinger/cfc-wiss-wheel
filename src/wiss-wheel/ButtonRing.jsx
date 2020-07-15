import React from 'react';

import { Animate } from 'react-move';
import { easeQuadOut } from 'd3-ease';

import ArcButton from './ArcButton.jsx';
import Utils from './Utils.js';

import './ButtonRing.scss';

export default class ButtonRing extends React.Component {

  arcButtons = [];
  ringIndex = null;
  reverseRingIndex = null;
  randomX = Math.random() * 100;
  btnIds = [0, 0, 0, 0].map(() => Utils.makeId(10));

  state = {
    isSelectedRing: false,
    rotation: 0,
    rotationModifier: 0,
    introStarted: false,
    introCompleted: false,
    appState: { selectedRingIndex: -1, selectedButtonIndex: -1 },
    ringDiff: 0,
    returnAll: false,
  };

  constructor(props) {

    super(props);

    const config = this.props.config;
    this.ringIndex = config.ringIndex;

  }

  componentDidMount() {
    if (!this.state.introStarted) {
      setTimeout(() => {
        this.setState({ introStarted: true });
        setTimeout(() => {
          this.setState({ introCompleted: true });
        }, 1000);
      }, 0);
    }
  }

  get rotation() {
    return this.state.rotation + this.state.rotationModifier;
  }

  componentDidUpdate(prevProps, prevState) {

    const selectedRingIndex = this.props.appState.selectedRingIndex;
    const selectedButtonIndex = this.props.appState.selectedButtonIndex;
    let stateMod = null;

    if (prevProps.returnAll !== this.props.returnAll) {
      stateMod = { returnAll: this.props.returnAll }
    }

    if (
      this.state.appState.selectedRingIndex !== selectedRingIndex ||
      this.state.appState.selectedButtonIndex !== selectedButtonIndex
    ) {

      const ringIndex = this.props.config.ringIndex;
      const isSelectedRing = selectedRingIndex === ringIndex;

      let rotation = this.state.rotation;

      const ringDiff = (this.props.appState.selectedRingIndex !== -1) ?
        Math.abs(this.props.appState.selectedRingIndex - this.ringIndex) : 0;

      if (isSelectedRing) {

        if (this.ringIndex === 1) {

          let mod = Math.abs(this.state.rotation % 360);
          let angles = null;

          switch (mod) {
            case 0:
              angles = [360, 90, 180, 270];
              break;
            case 90:
              angles = [270, 360, 90, 180];
              break;
            case 180:
              angles = [180, 270, 360, 90];
              break;
            case 270:
              angles = [90, 180, 270, 360];
              break;
            default:
              console.error("Whoops, something's jacked!")
          }

          let delta = angles[selectedButtonIndex];
          rotation = this.state.rotation - delta;
          this.setState({
            isSelectedRing: isSelectedRing,
            rotation: rotation,
            rotationModifier: 0,
            appState: this.props.appState,
            ringDiff: ringDiff,
            duration: 8 * delta + 1200,
            ...stateMod
          });
        } else {
          rotation = this.state.rotation - 720;
          this.setState({
            isSelectedRing: isSelectedRing,
            rotation: rotation,
            appState: this.props.appState,
            ringDiff: ringDiff,
            duration: 500 * ringDiff + 2000,
            ...stateMod
          });
        }
      } else {
        rotation = this.state.rotation - 360;
        this.setState({
          isSelectedRing: isSelectedRing,
          rotation: rotation,
          appState: this.props.appState,
          ringDiff: ringDiff,
          duration: 300 * ringDiff + 1200,
          ...stateMod
        });
      }
    } else if (stateMod) {
      this.setState({ ...stateMod });
    }
  }

  render() {

    const appState = this.props.appState;
    const config = this.props.config;
    const ringDiff = this.state.ringDiff;

    return <Animate
      start={() => ({
        radius: !this.state.isSelectedRing || this.state.returnAll ? config.radius : 200,
        thickness: config.thickness,
      })}

      update={() => {
        return {
          radius: [this.state.isSelectedRing && !this.state.returnAll ? 200 : config.radius],
          thickness: [this.state.isSelectedRing && !this.state.returnAll ? 100 : config.thickness],
          timing: { delay: 0, duration: 0},
        };
      }}
    >
      {(state1) => {

        const { radius, thickness } = state1;

        return <Animate
          start={() => ({
            rotation: -90,
          })}

          update={() => {
            return {
              rotation: [this.state.introStarted ? this.rotation : -90],
              timing: { delay: this.state.introCompleted ? ringDiff * 100 : 2200, duration: this.state.duration, ease: easeQuadOut },
            };
          }}
        >
          {(state2) => {

            const { rotation } = state2;

            const style = {
              zIndex: this.state.isSelectedRing ? 100 : "auto",
              opacity: 0.999999,
              transform: `rotate(${rotation}deg)`,
            };

            const btns = config.buttonConfigs.map((config, i) => {
              let tempConfig = { ...config };
              delete tempConfig.buttonConfigs;
              tempConfig = { ...tempConfig, ...config, ringIndex: this.ringIndex, buttonIndex: i };

              return <ArcButton
                id={`button${i}`}
                radius={radius}
                thickness={thickness}
                key={this.btnIds[i]}
                handleClick={this.props.handleClick}
                config={tempConfig}
                appState={appState}
              />;
            });

            return (
              <svg
                className={`wiss-button-ring wiss-button-ring${this.ringIndex} ${this.props.phaseClass}`}
                style={style}
              >
                {btns}
              </svg>
            )
          }}
        </Animate>
      }}
    </Animate>
  }
}

