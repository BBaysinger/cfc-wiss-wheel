import React from 'react';

import Button from './Button';

export default class ButtonLabel extends React.Component {

  buttons = [
    <Button id="button0" />,
    <Button id="button1" />,
    <Button id="button2" />,
    <Button id="button3" />,
  ];

  constructor() {
    super();
  }

  render() {
    return <g>
      {this.buttons}
    </g>
  }
}

