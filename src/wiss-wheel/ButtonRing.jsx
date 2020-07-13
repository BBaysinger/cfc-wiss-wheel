import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import ArcButton from './ArcButton.jsx';
import Utils from './Utils.js';

import './ButtonRing.scss';

export default class ButtonRing extends React.Component {

  arcButtons = []; Î
  ringIndex = null;
  reverseRingIndex = null;
  randomX = Math.random() * 100;
  btnIds = [Utils.makeId(10), Utils.makeId(10), Utils.makeId(10), Utils.makeId(10)];

  state = {
    isSelectedRing: false,
    rotation: 0,
    introStarted: false,
    introCompleted: false,
    appState: { selectedRingIndex: -1, selectedButtonIndex: -1 }
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

  componentDidUpdate(prevProps) {

    const selectedRingIndex = this.props.appState.selectedRingIndex;
    const selectedButtonIndex = this.props.appState.selectedButtonIndex;

    if (
      this.state.appState.selectedRingIndex !== selectedRingIndex ||
      this.state.appState.selectedButtonIndex !== selectedButtonIndex
    ) {

      const isSelectedRing = selectedRingIndex === this.props.config.ringIndex;

      this.reorderedButtons = this.arcButtons.concat();
      this.reorderedButtons.push(this.reorderedButtons.splice(selectedButtonIndex, 1)[0]);

      if (isSelectedRing) {

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

        let delta = -angles[selectedButtonIndex];
        let rotation = this.state.rotation + delta;

        // Trigger rerender of descendents by changing state (changing props doesn't do that).
        this.setState({ isSelectedRing: isSelectedRing, rotation: rotation, appState: this.props.appState });

      } else {
        // Trigger rerender of descendents by changing state (changing props doesn't do that).
        this.setState({ isSelectedRing: isSelectedRing, rotation: 0, appState: this.props.appState });

      }
    }
  }

  render() {

    const appState = this.props.appState;
    const config = this.props.config;

    for (var i = 0; i < config.buttonConfigs.length; i++) {
      let tempConfig = { ...config };
      delete tempConfig.buttonConfigs;
      tempConfig = { ...tempConfig, ...config.buttonConfigs[i], buttonIndex: i };

      this.arcButtons[i] = <ArcButton
        id={`button${i}`}
        key={this.btnIds[i]}
        handleClick={this.props.handleClick}
        config={tempConfig}
        appState={appState}
      />;
    }

    return <Animate
      start={() => ({
        rotation: -90,
      })}

      update={() => {
        return ({
          rotation: [this.state.introStarted ? this.state.rotation : -90],
          timing: { delay: this.state.introCompleted ? 0 : 1000, duration: 500, ease: easeExpOut },
        })
      }}
    >
      {(state) => {

        const { rotation } = state;

        const style = {
          zIndex: this.state.isSelectedRing ? 100 : "auto",
          opacity: 0.999999,
          transform: `rotate(${rotation}deg)`
        };

        return (
          <svg
            className={`wiss-button-ring wiss-button-ring${this.ringIndex} ${this.props.phaseClass}`}
            style={style}
          >
            {this.reorderedButtons || this.arcButtons}
          </svg>
        )
      }}
    </Animate>
  }
}

