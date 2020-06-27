import React from 'react';

import ArcButton from './ArcButton';

export default class ButtonRing extends React.Component {

  configs = [];

  constructor(props) {

    super();

    for (var i = 0; i < 4; i++) {
      var tempConfig = { ...props.config };
      delete tempConfig.buttonConfigs;
      this.configs[i] = { ...tempConfig, ...props.config.buttonConfigs[i] };
    }

    // console.log(this.configs[0], this.configs[1]);
  }

  componentDidMount() {

  }

  render() {

    let configs = this.configs;

    return <g>
      <ArcButton id="button0" config={configs[0]} />,
      <ArcButton id="button1" config={configs[1]} />,
      <ArcButton id="button2" config={configs[2]} />,
      <ArcButton id="button3" config={configs[3]} />,
    </g>
  }
}

