import React from 'react';

import ArcButton from './ArcButton';

export default class ButtonRing extends React.Component {

  arcButtons = [];
  ringIndex = null;
  reverseRingIndex = null;

  constructor(props) {

    super(props);

    const config = this.props.config;

    this.ringIndex = config.ringIndex;
    // this.reverseRingIndex = 3 - this.ringIndex;

    let key;

    for (var i = 0; i < config.buttonConfigs.length; i++) {
      let tempConfig = { ...config };
      delete tempConfig.buttonConfigs;
      tempConfig = { ...tempConfig, ...config.buttonConfigs[i], buttonIndex: i };
      key = "button" + i;
      this.arcButtons[i] = <ArcButton id={key} key={key} config={tempConfig} />;
    }
  }

  render() {

    return <g
      style={{ transitionDelay: `${this.ringIndex * 0.9}s` }}
      className={`wiss-button-ring wiss-button-ring${this.ringIndex}`}>
      {this.arcButtons}
    </g>
  }
}

