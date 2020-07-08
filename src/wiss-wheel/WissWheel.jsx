import React from 'react';

import ButtonRing from './ButtonRing';
import './WissWheel.scss';
import './wheel-animation.scss';
import Child from '../images/child.svg';

export default class WissWheel extends React.Component {

  static HEIGHT = 800;
  static WIDTH = 800;
  static VIEWBOX = -WissWheel.HEIGHT / 2 + " " + -WissWheel.WIDTH / 2 + " " + WissWheel.HEIGHT + " " + WissWheel.WIDTH;
  static selected_button_index = -1;
  static selected_ring_index = -1;

  offsetInterval = null;
  ringRefs = [];

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

  constructor(props) {

    super(props);

    this.ringRefs = [React.createRef(), React.createRef(), React.createRef(), React.createRef()];

  }

  handleClick = (ringIndex, buttonIndex) => {
    this.setState({ selectedRingIndex: ringIndex, selectedButtonIndex: buttonIndex });
    WissWheel.selected_ring_index = ringIndex;
    WissWheel.selected_button_index = buttonIndex;
    for (var i = 0; i < 4; i++) {
      this.ringRefs[i].current.update();
    }
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

    let key;
    const rings = [];

    for (var i = 0; i < this.ringConfigs.length; i++) {
      key = "ring" + i;
      rings[i] = <ButtonRing
        ref={this.ringRefs[i]}
        phaseClass={this.state.anims[i]}
        style={{ display: "none" }}
        id={key}
        key={key}
        handleClick={this.handleClick}
        config={{ ...this.ringConfigs[i], ringIndex: i }} />
    }

    // Keys/indexes remain as smaller rings first, but they need stacked oposite of that.
    rings.reverse();

    return <div>
      <div>
        Anim ID: {this.props.animState}
      </div>
      <svg className={`wiss-interactive-wheel`}
        viewBox={WissWheel.VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        width={WissWheel.HEIGHT}
        height={WissWheel.WIDTH}>
        <g>
          <g className={`wiss-wheel`}>
            {rings}
          </g>
          <g>
            <circle cx="0" cy="0" r="92" stroke="black" strokeWidth="0" fill="white" />
            <image x="-40" y="-70" height="138" xlinkHref={Child} />
          </g>
        </g>
      </svg>
    </div>
  }
}
