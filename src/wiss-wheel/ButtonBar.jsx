import React from 'react';

import './ButtonBar.scss';

export default class WissWheel extends React.Component {

  nextAnim = function () {
    alert("Not set.");
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
      <button onClick={() => this.nextAnim('one')}>One</button>
      <button onClick={() => this.nextAnim('two')}>Two</button>
      <button onClick={() => this.nextAnim('tre')}>Three</button>
      <button onClick={() => this.nextAnim('for')}>Four</button>
    </div>
  }
}
