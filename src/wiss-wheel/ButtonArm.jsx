import React from 'react';

import ArcButton from './ArcButton';
import './ButtonArm.scss';

export default class ButtonArm extends React.Component {

  static armPath(leg, radius) {
    return `M${-leg},-${radius} L0,-${radius} a${radius},${radius} 0 0,1 ${radius},${radius}`;
  }

  path = null;
  id = null;

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.path = ButtonArm.armPath(900, this.props.tweenRadius);
    this.id = `wissArm${this.props.ringIndex}-${this.props.buttonIndex}`;
  }

  render() {

    return (
      <path
        className="wiss-button-arm"
        id={this.id}
        d={this.path}
        stroke={ArcButton.randomColor()}
        strokeWidth={20}
        fill='none'
      />
    )
  }
}
