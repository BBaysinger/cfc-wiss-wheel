import React from 'react';

import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import ArcButton from './ArcButton';
import WISSWheel from './WISSWheel';
import './ButtonRing.scss';

export default class ButtonRing extends React.Component {

  arcButtons = [];
  ringIndex = null;
  reverseRingIndex = null;
  randomX = Math.random() * 100;

  // HACK: I couldn't figure out how to get react-motion to work without setting state in each button. >:-(
  btnRefs = null;

  state = {
    isSelectedRing: false,
    rotation: 0,
    introStarted: false
  };

  constructor(props) {

    super(props);

    const config = this.props.config;
    this.ringIndex = config.ringIndex;
    let key;

    this.btnRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

    for (var i = 0; i < config.buttonConfigs.length; i++) {
      let tempConfig = { ...config };
      delete tempConfig.buttonConfigs;
      tempConfig = { ...tempConfig, ...config.buttonConfigs[i], buttonIndex: i };

      key = "button" + i;

      this.arcButtons[i] = <ArcButton
        ref={this.btnRefs[i]}
        id={key}
        key={key}
        handleClick={this.props.handleClick}
        config={tempConfig}
      />;
    }
  }

  update = () => {

    const isSelectedRing = WISSWheel.selected_ring_index === this.props.config.ringIndex;
    let selectedButtonIndex = WISSWheel.selected_button_index

    if (isSelectedRing) {
      if (WISSWheel.selected_ring_index !== 1) {
        selectedButtonIndex = 1;
      }

      let mod = Math.abs(this.state.rotation % 360);
      let angles;

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

      this.setState({ isSelectedRing: isSelectedRing, rotation: rotation });

    } else {

      this.setState({ isSelectedRing: isSelectedRing, rotation: 0 });

    }

    for (var i = 0; i < 4; i++) {
      if (this.btnRefs[i].current) {
        this.btnRefs[i].current.update();
      }
    }
  }

  componentDidMount() {
    if (!this.state.introStarted) {
      setTimeout(() => {
        this.setState({ introStarted: true });
      }, 0);
    }
  }

  render() {

    return <Animate
      start={() => ({
        rotation: -180,
      })}

      update={() => {
        return ({
          rotation: [this.state.introStarted ? this.state.rotation : -180],
          timing: { duration: 1000, ease: easeExpOut },
        })
      }}
    >
      {(state) => {

        const { rotation } = state;

        let style = { transform: `rotate(${rotation}deg)` };

        return (
          <svg
            className={`wiss-button-ring wiss-button-ring${this.ringIndex} ${this.props.phaseClass}`}
            style={style}
          >
            {this.arcButtons}
          </svg>
        )
      }}
    </Animate>

  }
}

