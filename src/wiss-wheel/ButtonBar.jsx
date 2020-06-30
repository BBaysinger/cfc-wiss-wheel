import React from 'react';

import './ButtonBar.scss';

export default class WissWheel extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return <div className="wiss-button-bar" style={{ textAlign: "center" }}>
      <button>One</button>
      <button>Two</button>
      <button>Three</button>
      <button>Four</button>
    </div>
  }
}
