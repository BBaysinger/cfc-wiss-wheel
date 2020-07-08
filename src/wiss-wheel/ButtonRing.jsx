import React from 'react';

import ArcButton from './ArcButton';
import WissWheel from './WissWheel';

export default class ButtonRing extends React.Component {

  arcButtons = [];
  ringIndex = null;
  reverseRingIndex = null;

  // HACK: I couldn't figure out how to get react-motion to work without setting state in each button. >:-(
  btnRefs = null;

  state = { isSelectedRing: false };

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

    this.setState({ isSelectedRing: WissWheel.selected_ring_index === this.props.config.ringIndex });

    for (var i = 0; i < 4; i++) {
      if (this.btnRefs[i].current) {
        this.btnRefs[i].current.update();
      }
    }
  }

  render() {

    let style = {};
    let rotation = (this.state.isSelectedRing) ? WissWheel.selected_button_index * -90 : null;
    if (typeof rotation !== 'undefined') style = { transform: `rotate(${rotation}deg)` }

    console.log(this.state.isSelectedRing);

    return <g
      className={`wiss-button-ring wiss-button-ring${this.ringIndex} ${this.props.phaseClass}`}
      style={style}
    >
      {this.arcButtons}
    </g>
  }
}

