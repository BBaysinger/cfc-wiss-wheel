import React from 'react';

import './ButtonBar.scss';

export default class WissWheel extends React.Component {

  nextAnim = function () {
    alert("Oops, not set.");
  };

  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    if (this.props.nextAnim) {
      this.nextAnim = this.props.nextAnim;
    }
  }

  render() {

    return <div className="wiss-button-bar" style={{ textAlign: "center" }}>
      <button onClick={() => this.nextAnim('a1')}>One</button>
      <button onClick={() => this.nextAnim('a2')}>Two</button>
      <button onClick={() => this.nextAnim('a3')}>Three</button>
      <button onClick={() => this.nextAnim('a4')}>Four</button>
      <button onClick={() => this.nextAnim('')} style={{backgroundColor: 'orange'}}>Reset</button>
    </div>
  }
}
