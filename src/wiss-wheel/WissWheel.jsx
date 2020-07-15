import React from 'react';

import ButtonRing from './ButtonRing.jsx';
import Child from '../images/child.svg';
import ButtonArm from './ButtonArm.jsx';
import Utils from './Utils.js';
import ContentBody from './ContentBody.jsx';

import './WISSWheel.scss';
import './wheel-animation.scss';

export default class WISSWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;

  offsetInterval = null;
  rings = null;
  ringOrder = [3, 2, 1, 0];
  armConfigs = [{}, {}, {}];
  count = 0;

  state = {
    phases: ['', '', '', ''],
    anims: ['', '', '', ''],
    selectedRingIndex: -1,
    selectedButtonIndex: -1,
    returnAll: false,
  }

  ringConfigs = [
    {
      radius: 121, thickness: 59, buttonConfigs: [
        { color: "#58595B", redirectClick: 1 },
        { color: "#58595B", textColor: '#fff', label: "Families" },
        { color: "#58595B", redirectClick: 1 },
        { color: "#58595B", redirectClick: 1 },
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
        { color: "#B1B3B6", redirectClick: 1 },
        { color: "#B1B3B6", redirectClick: 1 },
      ]
    },
    {
      radius: 362.5, thickness: 75, buttonConfigs: [
        {},
        { color: "#E4E1DC", textColor: '#000', label: "Out-of-School Time" },
      ]
    },
  ];

  handleClick = (ringIndex, buttonIndex) => {

    if (ringIndex === this.state.selectedRingIndex && buttonIndex === this.state.selectedButtonIndex) {
      return;
    }

    this.count++;

    const ringConfig = this.ringConfigs[ringIndex];
    const buttonConfig = ringConfig.buttonConfigs[buttonIndex];
    const armConfigs = this.armConfigs;

    armConfigs.push({
      buttonIndex: buttonIndex,
      color: buttonConfig.color,
      label: buttonConfig.label,
      radius: 200,
      ringIndex: ringIndex,
      textColor: buttonConfig.textColor,
      thickness: 100,
      uid: Utils.makeId(6),
    });

    this.armConfigs = armConfigs.slice(armConfigs.length - 3);

    this.setState({ selectedRingIndex: ringIndex, selectedButtonIndex: buttonIndex, returnAll: false });

    if (ringIndex !== 1) {
      setTimeout(() => {
        this.setState({ returnAll: true });
      }, 800)
    }
  }

  someFunction() {
    // Function content.
  }

  componentDidUpdate(prevProps, prevState) {

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

    const selectedRingIndex = this.state.selectedRingIndex;
    const selectedButtonIndex = this.state.selectedButtonIndex;

    const appState = {
      selectedRingIndex: selectedRingIndex,
      selectedButtonIndex: selectedButtonIndex,
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
        returnAll={this.state.returnAll}
      />
    });

    const buttonArms = this.armConfigs.map((config, slot) => {
      if (config) {
        const index = (this.count + slot) % 3;
        const id = `FixedArm${index}`;
        config.idMod = id;
        return <ButtonArm
          thickness={100}
          tweenRadius={200}
          config={config}
          index={index}
          slot={slot}
          appState={appState}
          key={id}
          uid={id}
        />
      } else {
        return null;
      }
    });

    buttonArms.shift();

    return (
      <div>
        <div className={'wiss-interactive-wheel'}
          width={WISSWheel.HEIGHT}
          height={WISSWheel.WIDTH}>
          <div className="wiss-wheel-clipping">
            <div className={'wiss-wheel-clipping'}>
              {rings}
            </div>
            <svg className="wiss-overlay-layer">
              <g transform="translate(400,400)">
                <image className="wiss-child" x="-40" y="-70" height="138" xlinkHref={Child} />
              </g>
            </svg>
          </div>
          <svg
            className="wiss-arm-layer"
            viewBox={'-400 -400 800 1200'}
          >
            <g transform="rotate(-90)">
              {buttonArms}
            </g>
          </svg>
        </div>
        <ContentBody
          selectedRingIndex={this.state.selectedRingIndex}
          selectedButtonIndex={this.state.selectedButtonIndex}
          someFunction={this.someFunction}
        >
        </ContentBody>
      </div>
    )
  }
}

