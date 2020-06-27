import React from 'react';

export default class Test extends React.Component {

  constructor(props) {
    super();

    // console.log(props);
  }

  render() {
    return <g>
      <circle cx="0" cy="0" r="200" stroke="black" strokeWidth={this.props.thickness} fill="transparent" />
    </g>
  }
}
