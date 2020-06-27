import React from 'react';

import Button from './Button';

export default class ButtonRing extends React.Component {

  configs = [];

  constructor(props) {
    super();

    for (var i; i < 4; i++) {
      this.configs[i] = {...props.config, ...props.config.buttonConfigs}
    }

    console.log(1234, props.config, props.config.buttonConfigs);
  }

  componentDidMount() {

  }

  render() {

    let configs = this.configs;

    return <g>
      <Button id="button0" config={configs[0]} />,
      <Button id="button1" config={configs[1]} />,
      <Button id="button2" config={configs[2]} />,
      <Button id="button3" config={configs[3]} />,
    </g>
  }
}

