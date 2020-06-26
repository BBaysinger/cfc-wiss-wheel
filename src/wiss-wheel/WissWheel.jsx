import React from 'react';

class WissWheel extends React.Component() {

  buttonData = [
    {radius: 100, stroke: 10 , ids:["Families", "", "", ""]},
    {radius: 150, stroke: 20 , ids:["Elementary", "Middle School", "HighSchool", "Early Learning"]},
    {radius: 100, stroke: 200, ids:["SEL for Adults", "", ""]},
    {radius: 100, stroke: 250, ids:["Out-of-School Time"]},
  ];

  constructor() {

  }

  render() {
    return<svg width="500" height="500">
      <g>
        <ButtonWheel id="ring1" data={buttonData[0]} />
        <ButtonWheel id="ring2" data={buttonData[1]} />
        <ButtonWheel id="ring3" data={buttonData[2]} />
        <ButtonWheel id="ring4" data={buttonData[3]} />
      </g>
    </svg>;
  }
}
