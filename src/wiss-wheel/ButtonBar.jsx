import React from 'react'

/**
 *
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class ButtonBar extends React.Component {

  /**
   *
   *
   * @memberof ButtonBar
   */
  nextAnim = function() {
    alert('Oops, not set.')
  }

  /**
   *
   *
   * @memberof ButtonBar
   */
  componentDidMount() {
    if (this.props.nextAnim) {
      this.nextAnim = this.props.nextAnim
    }
  }

  /**
   *
   *
   * @returns
   * @memberof ButtonBar
   */
  render() {
    return (
      <div className="wiss-button-bar" style={{ textAlign: 'center' }}>
        {/* <button onClick={() => this.nextAnim('anim1')}>One</button>
          <button onClick={() => this.nextAnim('anim2')}>Two</button>
          <button onClick={() => this.nextAnim('')} style={{ backgroundColor: 'orange' }}>Reset</button> */}
      </div>
    )
  }
}
