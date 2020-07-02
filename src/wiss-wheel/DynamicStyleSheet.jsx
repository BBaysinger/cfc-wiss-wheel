import React from 'react';

export default class DynamicStyleSheet extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    const css =

      `
* {border: 1px solid red};
`;

    return <style type="text/css">
      {css}
    </style>
  }
}
