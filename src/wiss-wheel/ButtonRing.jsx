import React from 'react';

import Button from './Button';

export default class ButtonLabel extends React.Component {

  buttons = [
    <Button id="0" />,
    <Button id="1" />,
    <Button id="2" />,
    <Button id="3" />,
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

