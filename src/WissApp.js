import React from "react";

import WISSWheel from "./wiss-wheel/WISSWheel.jsx";
import ButtonBar from "./wiss-wheel/ButtonBar.jsx";

import "./WissApp.scss";

export default class WissApp extends React.Component {
  /**
   *
   *
   * @memberof WissApp
   */
  state = {
    animState: null,
  };

  /**
   * Creates an instance of WissApp.
   * 
   * @param {*} props
   * @memberof WissApp
   */
  constructor(props) {
    super();
  }

  /**
   *
   *
   * @memberof WissApp
   */
  nextAnim = (animState) => {
    this.setState({ animState: animState });
  };

  /**
   *
   *
   * @returns
   * @memberof WissApp
   */
  render() {
    return (
      <div className="wiss-app-parent">
        <header className="wiss-app-header">
          {/* What is Second Step (WISS) Interactive Component */}
        </header>
        <div className="wiss-app">
          <WISSWheel animState={this.state.animState} />
          <ButtonBar nextAnim={this.nextAnim} />
        </div>
      </div>
    );
  }
}
