import React from 'react';

import './ContentBody.scss';
import Ess from '../images/second-step-s-bug.png';

export default class ContentBody extends React.Component {

  // TODO: Cascade animations. https://stackoverflow.com/questions/18518237/how-do-you-make-nth-child-work-with-descendant-selectors

  copySection = [];
  classierName = [[''], ['', '', '', ''], [''], ['']];

  componentDidUpdate(prevProps) {

    if (
      prevProps.selectedRingIndex !== this.props.selectedRingIndex ||
      prevProps.selectedButtonIndex !== this.props.selectedButtonIndex
    ) {
      this.classierName[this.props.selectedRingIndex][this.props.selectedRingIndex] = 'yolo';
      // this.setState({ rand: Math.random() });
    }
  }

  render() {

    return (

      <div id="wiss-wheel-content-body">




        <section id="wiss-wheel-content-section-0-0" className={`wiss-wheel-content-section ${this.classierName[0][0]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posue eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nuc magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum prictus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




        <section id="wiss-wheel-content-section-1-0" className={`wiss-wheel-content-section ${this.classierName[1][0]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia cura
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia cuetus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primorbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




        <section id="wiss-wheel-content-section-1-1" className={`wiss-wheel-content-section ${this.classierName[1][1]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctrbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi effam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




        <section id="wiss-wheel-content-section-1-2" className={`wiss-wheel-content-section ${this.classierName[1][2]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in isl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ul. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primistur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




        <section id="wiss-wheel-content-section-1-3" className={`wiss-wheel-content-section ${this.classierName[1][3]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faurae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestirices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




        <section id="wiss-wheel-content-section-2-0" className={`wiss-wheel-content-section ${this.classierName[2][0]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




        <section id="wiss-wheel-content-section-3-0" className={`wiss-wheel-content-section ${this.classierName[3][0]}`} >

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img className="wiss-ess" src={Ess} alt="" />
              This is a heading.
            </div>
            <div className="wiss-body">
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi efficitur nisl sapien, eget. Nunc mauris metus, aliquam nec magna id, sollicitudin tempor arcu.
            </div>
            <div className="href">
              <a className="wiss-link" href="http://placeholderURL" rel="noopener noreferrer" target="_blank">Here's a link.</a>
            </div>
          </section>

        </section>




      </div>
    )
  }
}

