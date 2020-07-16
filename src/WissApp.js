import React from 'react';

import WISSWheel from "./wiss-wheel/WISSWheel.jsx";
import ButtonBar from './wiss-wheel/ButtonBar.jsx';

import './WissApp.scss';

export default class WissApp extends React.Component {

  state = {
    animState: null,
  }

  constructor(props) {
    super();
  }

  nextAnim = (animState) => {
    this.setState({ animState: animState });
  }

  render() {
    return <div className="wiss-app-parent">
      <header className="wiss-app-header">
        {/* What is Second Step (WISS) Interactive Component */}
      </header>
      <div className="wiss-app">
        <WISSWheel animState={this.state.animState} />
        <ButtonBar nextAnim={this.nextAnim} />
      </div>
    </div>
  }
}