import React from 'react'

import Instructions from './Instructions'

/**
 *
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class ContentBody extends React.Component {

  /**
   *
   *
   * @memberof ContentBody
   */
  copySection = []

  /**
   *
   *
   * @memberof ContentBody
   */
  state = {}
  
  /**
   *
   *
   * @memberof ContentBody
   */
  classMap = [[''], ['', '', '', ''], [''], ['']]

  /**
   *
   *
   * @memberof ContentBody
   */
  launchArm = null

  /**
   *
   *
   * @memberof ContentBody
   */
  contentRef = React.createRef

  /**
   *
   *
   * @param {*} selector
   * @param {*} equation
   * @param {*} cssClass
   * @memberof ContentBody
   */
  setDelays(selector, equation, cssClass) {
    // HACK: Not the React way, but it's just a side effect...
    // const arr = document.querySelector(selector).querySelectorAll("div");
    // Array.from(arr).map((node, k) => {
    //   if (cssClass === 'reset') {
    //     // node.style.transition = node.style.transitionDelay = "none";
    //     node.classList.add(cssClass);
    //     setTimeout(() => {
    //       // node.style.transitionDelay = node.style.transitionDuration = "";
    //       node.classList.remove(cssClass);
    //     }, 1);
    //   } else {
    //     node.style.transitionDelay = eval(equation) + 's';
    //     node.classList.add(cssClass);
    //   }
    // });
  }

  /**
   *
   *
   * @param {*} prevProps
   * @memberof ContentBody
   */
  componentDidUpdate(prevProps) {
    if (window) {
      if (
        prevProps.ringIndex !== this.props.ringIndex ||
        prevProps.buttonIndex !== this.props.buttonIndex
      ) {
        if (prevProps.ringIndex !== -1) {
          this.setDelays(
            `#wiss-wheel-content-section-${prevProps.ringIndex}-${prevProps.buttonIndex}`,
            '0.09 * k',
          )
        }

        if (this.props.ringIndex !== -1) {
          this.setDelays(
            `#wiss-wheel-content-section-${this.props.ringIndex}-${this.props.buttonIndex}`,
            '0.1 * k + 0.6',
            'reset',
          )
        }
        this.setState({
          ringIndex: this.props.ringIndex,
          buttonIndex: this.props.buttonIndex,
        })
      }
    }
  }

  /**
   *
   *
   * @param {*} ringIndex
   * @param {*} buttonIndex
   * @returns
   * @memberof ContentBody
   */
  isSelectedContent(ringIndex, buttonIndex) {
    const retVal =
      ringIndex === this.props.ringIndex &&
      buttonIndex === this.props.buttonIndex
        ? 'shownContent'
        : ''

    return retVal
  }

  /**
   *
   *
   * @returns
   * @memberof ContentBody
   */
  render() {
    let left,
      marg,
      styles = {}

    if (typeof window !== 'undefined' && window.innerWidth <= 990) {
      left = `calc(44vw - 20px)`
      marg = -25 + 870 * this.props.wheelScale
      // TODO: Figure out why this is off on smaller screens.
      if (window.innerWidth < 400) marg += 1
      styles = { marginTop: marg + 'px', left: left }
    }

    return (
      <div
        id="wiss-wheel-content-wrapper"
        style={styles}
        className={`wiss-introItem`}
      >
        <section
          id="wiss-wheel-content-section--1--1"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            -1,
            -1,
          )}`}
        >
          <Instructions />
        </section>

        <section
          id="wiss-wheel-content-section-0-1"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            0,
            1,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">Family Supports</div>
            <div className="wiss-body">
              All Second Step<sup>®</sup> programs include supports for
              families, from weekly letters and book lists to free resources
              like{' '}
              <a href="https://www.imagineneighborhood.org/" target="_blank" rel="noopener noreferrer">
                <em>
                  The Imagine Neighborhood<sup>™</sup>
                </em>
              </a>{' '}
              podcast series and{' '}
              <a href="https://www.parenteenconnect.org/" target="_blank" rel="noopener noreferrer">
                ParenTeen Connect
              </a>
              . Families can also bring social-emotional learning home through
              our{' '}
              <a
                href="https://www.cfchildren.org/resources/bullying-prevention-information/"
                target="_blank" rel="noopener noreferrer"
              >
                Captain Compassion<sup>®</sup>
              </a>{' '}
              comics, which give kids and adults the power to prevent bullying,
              as well as our{' '}
              <a
                href="https://www.cfchildren.org/resources/child-abuse-prevention/"
                target="_blank" rel="noopener noreferrer"
              >
                Hot Chocolate Talk<sup>®</sup>
              </a>{' '}
              resource, which helps families talk about child safety.{' '}
            </div>
          </section>
        </section>

        <section
          id="wiss-wheel-content-section-1-0"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            1,
            0,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/4qJP2Xo6dBfpAddsMfQEYY/df4adfb6a7dc767d4a77c0ea2ae45df1/lockups_0005_ss-el-logo-lockup.png'
                }
                alt="Second Step Early Learning"
              />
            </div>
            <div className="wiss-body">
              Social-emotional learning (SEL) classroom kits and online
              resources to help your littlest learners harness their energy
              and&nbsp;potential.
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/early-learning-curriculum"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn&nbsp;More
              </a>
              .
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess wiss-ess-cpu"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/5Kb9Rk8D5MQrrYU9ayGGCT/586d0b29afd154c57cffa7513900f4c8/lockups_0000_ss-cpu-logo-lockup.png'
                }
                alt="Second Step Child Protection Unit"
              />
            </div>
            <div className="wiss-body">
              A stand-alone unit with staff training, student lessons, and
              family materials to help prevent child abuse and&nbsp;neglect.
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/child-protection"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn More
              </a>
            </div>
          </section>
        </section>

        <section
          id="wiss-wheel-content-section-1-1"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            1,
            1,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/IjVkd0DD10SNTT86G3T3o/ea83be2b23098c1438f9a4195bb3d1d8/lockups_0003_ss-elementary-logo-lockup.png'
                }
                alt="Second Step Elementary"
              />
            </div>
            <div className="wiss-body">
              Universal, classroom-based, social-emotional learning (SEL)
              curriculum for Kindergarten–Grade 5 that nurtures children’s
              social-emotional competence and foundational learning&nbsp;skills.
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/elementary-school-curriculum"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn More
              </a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess wiss-ess-bpu"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/5x5TTqevK42rqyqwvPYX8Q/56e194c42f476b843cfa3c1639bb6f68/lockups_0006_ss-bpu-logo-lockup.png'
                }
                alt="Second Step Bullying Prevention Unit"
              />
            </div>
            <div className="wiss-body">
              Lessons, activities, and take-home materials to help educators
              prevent bullying throughout the&nbsp;school.
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/bullying-prevention"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn&nbsp;More
              </a>
            </div>
          </section>

          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess wiss-ess-cpu"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/5Kb9Rk8D5MQrrYU9ayGGCT/586d0b29afd154c57cffa7513900f4c8/lockups_0000_ss-cpu-logo-lockup.png'
                }
                alt="Second Step Child Protection Unit"
              />
            </div>
            <div className="wiss-body">
              A stand-alone unit with staff training, student lessons, and
              family materials to help prevent child abuse and&nbsp;neglect.
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/child-protection"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn More
              </a>
            </div>
          </section>
        </section>

        <section
          id="wiss-wheel-content-section-1-2"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            1,
            2,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/6uMlTEelWKINKKubqAmp0g/2b703ce010fe6d0a9a5726e465cf4cbb/lockups_0001_ms-logo-lockup.png'
                }
                alt="Second Step Middle School"
              />
            </div>
            <div className="wiss-body">
              Web-based, teacher-facilitated lessons and advisory activities,
              along with program training and resources to help middle-schoolers
              build social-emotional skills for&nbsp;life.
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/middle-school-curriculum"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn&nbsp;More
              </a>
            </div>
          </section>
        </section>

        <section
          id="wiss-wheel-content-section-1-3"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            1,
            3,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/3NCv4Xg4l9hh2cH5DoovHo/79d09e03e7a00765383a2c3f8a848b46/lockups_0002_sela-logo-lockup.png'
                }
                alt="Second Step SEL for Adults"
              />
            </div>
            <div className="wiss-body">
              In 2021, our adult professional learning program will be available
              to support the social-emotional development of K–12 educators.
              Second Step SEL for Adults is a stand-alone program, so even if
              your high school doesn’t have a student-facing social-emotional
              learning (SEL) curriculum, the program will help build a stronger
              school community around SEL—starting with the&nbsp;adults.
              <br />
              {/* <em>Coming in&nbsp;2021.</em> */}
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/social-emotional-learning-adults"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn&nbsp;More
              </a>
            </div>
          </section>
        </section>

        <section
          id="wiss-wheel-content-section-2-1"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            2,
            1,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/3NCv4Xg4l9hh2cH5DoovHo/79d09e03e7a00765383a2c3f8a848b46/lockups_0002_sela-logo-lockup.png'
                }
                alt="Second Step SEL for Adults"
              />
            </div>
            <div className="wiss-body">
              A stand-alone professional learning program for schools and
              districts to inspire and strengthen the school community by
              supporting K–12 educators’ social-emotional&nbsp;development.
              <br />
              <em>Coming in&nbsp;2021</em>
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/social-emotional-learning-adults"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn&nbsp;More
              </a>
            </div>
          </section>
        </section>

        <section
          id="wiss-wheel-content-section-3-1"
          className={`wiss-wheel-content-section ${this.isSelectedContent(
            3,
            1,
          )}`}
        >
          <section className="wiss-copy-section">
            <div className="wiss-subhead">
              <img
                className="wiss-ess wiss-ess-cpu"
                src={
                  'https://images.ctfassets.net/98bcvzcrxclo/5qhTeqxUOLJIWlB3m2an0P/ba9e6cb690d4f1ad928e1b652cb26a26/lockups_0004_ost-logo-lockup.png'
                }
                alt="Second Step Out-of-School Time"
              />
            </div>
            <div className="wiss-body">
              A research-based program for after-school and other
              out-of-school-time settings that helps support youth development
              and build more positive communities through social-emotional
              learning. The program includes age-appropriate activities for
              children in Grades K–5 as well as online training and embedded
              supports for adult&nbsp;facilitators.{' '}
            </div>
            <div className="href">
              <a
                className="wiss-link"
                href="/social-emotional-learning-adults"
                rel="noopener noreferrer"
                target="_blank"
              >
                Learn More
              </a>
              .
            </div>
          </section>
        </section>
      </div>
    )
  }
}
