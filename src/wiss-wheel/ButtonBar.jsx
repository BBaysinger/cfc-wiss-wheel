import React from 'react';

import './ButtonBar.scss';

export default class ButtonBar extends React.Component {

  nextAnim = function () {
    alert("Oops, not set.");
  };

  componentDidMount() {
    if (this.props.nextAnim) {
      this.nextAnim = this.props.nextAnim;
    }
  }

  render() {

    return <div className="wiss-button-bar" style={{ textAlign: "center" }}>
      <button onClick={() => this.nextAnim('anim1')}>One</button>
      <button onClick={() => this.nextAnim('anim2')}>Two</button>
      <button onClick={() => this.nextAnim('')} style={{ backgroundColor: 'orange' }}>Reset</button>
    </div>
  }
}
