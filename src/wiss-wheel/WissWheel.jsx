import React from 'react';

import ButtonRing from './ButtonRing';
import Child from '../images/child.svg';
import ButtonArm from './ButtonArm';
import './WISSWheel.scss';
import './wheel-animation.scss';

export default class WISSWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WISSWheel.HEIGHT / 2 + " " + -WISSWheel.WIDTH / 2 + " " + WISSWheel.HEIGHT + " " + WISSWheel.WIDTH;

  offsetInterval = null;
  rings = null;
  ringOrder = [3, 2, 1, 0];

  state = {
    phases: ['', '', '', ''],
    anims: ['', '', '', ''],
    selectedRingIndex: -1,
    selectedButtonIndex: -1,
  }

  ringConfigs = [
    {
      radius: 121, thickness: 59, buttonConfigs: [
        { color: "#58595B" },
        { color: "#58595B", textColor: '#fff', label: "Families" },
        { color: "#58595B" },
        { color: "#58595B" },
      ]
    },
    {
      radius: 200, thickness: 100, buttonConfigs: [
        { color: "#E74F3D", textColor: '#fff', label: "Early Learning" },
        { color: "#44797B", textColor: '#fff', label: "Elementary" },
        { color: "#162D54", textColor: '#fff', label: "Middle School" },
        { color: "#FFBF3C", textColor: '#000', label: "High School" },
      ]
    },
    {
      radius: 287.5, thickness: 75, buttonConfigs: [
        { color: "#FFFFFF" },
        { color: "#B1B3B6", textColor: '#fff', label: "SEL for Adults" },
        { color: "#B1B3B6" },
        { color: "#B1B3B6" },
      ]
    },
    {
      radius: 362.5, thickness: 75, buttonConfigs: [
        {},
        { color: "#E4E1DC", textColor: '#000', label: "Out-of-School Time" },
      ]
    },
  ];

  // constructor(props) {
  //   super(props);
  // }

  handleClick = (ringIndex, buttonIndex) => {

    this.setState({ selectedRingIndex: ringIndex, selectedButtonIndex: buttonIndex });

  }

  componentDidUpdate(prevProps) {

    if (this.props.animState !== prevProps.animState) {
      this.animState = this.props.animState;

      let updateIndex = 0;
      const anims = this.state.phases;

      const update = () => {
        anims[updateIndex] = this.animState;
        this.setState({ anims: anims });
        updateIndex++;
        if (updateIndex >= 4) {
          clearInterval(this.offsetInterval);
        }
      }

      clearInterval(this.offsetInterval);
      this.offsetInterval = setInterval(update, 400);
      update();
    }
  }

  render() {

    const appState = {
      selectedRingIndex: this.state.selectedRingIndex,
      selectedButtonIndex: this.state.selectedButtonIndex,
    }

    const armConfig = {
      buttonIndex: -1,
      color: "#FFBF3C",
      label: "High School",
      radius: 200,
      ringIndex: -1,
      textColor: "#000",
      thickness: 100,
    }

    const rings = this.ringConfigs.map((config, i) => {
      return <ButtonRing
        phaseClass={this.state.anims[i]}
        style={{ display: "none" }}
        id={`ring${i}`}
        key={`ring${i}`}
        handleClick={this.handleClick}
        config={{ ...config, ringIndex: i }}
        appState={appState}
      />
    });

    return (
      <div>
        <div>
          Anim ID: {this.props.animState}
        </div>
        <div className={`wiss-interactive-wheel`}
          xmlns="http://www.w3.org/2000/svg"
          width={WISSWheel.HEIGHT}
          height={WISSWheel.WIDTH}>
          <div>
            <div className={`wiss-wheel`}>
              {rings}
            </div>
            <svg className="wiss-child">
              <g transform="translate(400,400)">
                <circle cx="0" cy="0" r="92" stroke="black" strokeWidth="0" fill="white" />
                <image x="-40" y="-70" height="138" xlinkHref={Child} />
                <ButtonArm
                  isSelectedButton={true}
                  thickness={100}
                  tweenRadius={200}
                  config={armConfig}
                  appState={appState}
                />;
              </g>
            </svg>
          </div>
        </div>
      </div>
    )
  }
}

