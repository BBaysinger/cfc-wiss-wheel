import React from 'react';

import ArcButton from './ArcButton';

export default class ButtonRing extends React.Component {

  arcButtons = [];

  constructor(props) {

    super(props);

    const config = this.props.config;
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

    return <g>
      {this.arcButtons}
    </g>
  }
}

