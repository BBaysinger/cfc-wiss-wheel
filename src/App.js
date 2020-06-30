import React from 'react';

import ButtonBar from './wiss-wheel/ButtonBar';
import './App.scss';

import WissWheel from "./wiss-wheel/WissWheel";

export default class App extends React.Component {

  state = {
    animState: 'text',
  }

  constructor(props) {
    super();
  }

  nextAnim = (animState) => {
    this.setState({ animState: animState });
  }

  render() {
    return <div className="App">
      <header className="App-header">
        What is Second Step (WISS) Interactive Component
      </header>
      <div className="app-container">
        <WissWheel animState={this.state.animState} />
        <ButtonBar nextAnim={this.nextAnim} />
      </div>
    </div>
  }
}