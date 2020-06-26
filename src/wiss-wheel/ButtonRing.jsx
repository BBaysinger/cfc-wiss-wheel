import React from 'react';

import Button from './Button';

class ButtonLabel extends React.Component() {

  buttons = [
    <Button id="0" />,
    <Button id="1" />,
    <Button id="2" />,
    <Button id="3" />,
  ];

  constructor () {

  }

  render() {
    return
    <g>
      {buttons}
    </g>
  }
}

