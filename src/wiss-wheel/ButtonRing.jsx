import React from 'react';

import ArcButton from './ArcButton';

export default class ButtonRing extends React.Component {

  arcButtons = [];
  ringIndex = null;
  reverseRingIndex = null;
  // HACK: I couldn't figure out how to get react-motion to work without setting state in each button. >:-(
  btnRefs = null;

  state = { selected: true };

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
      this.arcButtons[i] = <ArcButton ref={this.btnRefs[i]} id={key} key={key} handleClick={this.handleChildClick} config={tempConfig} />;
    }
  }

  handleChildClick = () => {

    this.setState({ selected: !this.state.selected });

    for (var i = 0; i < 4; i++) {
      this.btnRefs[i].current.setState({ selected: this.state.selected });
    }

  }

  render() {

    return <g
      className={`wiss-button-ring wiss-button-ring${this.ringIndex} ${this.props.phaseClass}`}>
      {this.arcButtons}
    </g>
  }
}

