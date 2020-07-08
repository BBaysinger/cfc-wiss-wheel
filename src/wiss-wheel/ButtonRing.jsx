import React from 'react';

import ArcButton from './ArcButton';
import WissWheel from './WissWheel';
import './ButtonRing.scss';

export default class ButtonRing extends React.Component {

  arcButtons = [];
  ringIndex = null;
  reverseRingIndex = null;

  // HACK: I couldn't figure out how to get react-motion to work without setting state in each button. >:-(
  btnRefs = null;

  state = { isSelectedRing: false, rotation: 0 };

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

    const isSelectedRing = WissWheel.selected_ring_index === this.props.config.ringIndex;

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
    }

    let delta = -angles[WissWheel.selected_button_index];
    let rotation = this.state.rotation + delta;

    // if (rotation !== null) {
    //   console.log(mod, delta);
    // }

    for (var i = 0; i < 4; i++) {
      if (this.btnRefs[i].current) {
        this.btnRefs[i].current.update();
      }
    }

    this.setState({ isSelectedRing: isSelectedRing, rotation: rotation });

  }

  render() {

    let style = (this.state.isSelectedRing) ? { transform: `rotate(${this.state.rotation}deg)` } : {};

    return <g
      className={`wiss-button-ring wiss-button-ring${this.ringIndex} ${this.props.phaseClass}`}
      style={style}
    >
      {this.arcButtons}
    </g>
  }
}

