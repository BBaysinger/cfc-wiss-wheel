import React from 'react'

/**
 *
 *
 * @author Bradley Baysinger
 * @since  x.x.x
 * @version N/A
 */
export default class ButtonLabel extends React.Component {
  render() {
    const config = this.props.config

    const idInts = config.ringIndex + '-' + config.buttonIndex
    const circPathId = 'circ' + idInts
    const label = config.label
    const textColor = config.textColor

    return (
      <text
        className="wiss-arc-button-label"
        transform="rotate(-45)"
        dominantBaseline="central"
      >
        <textPath
          startOffset="50%"
          xlinkHref={`#${circPathId}`}
          fill={textColor}
        >
          {label}
          {/* {config.buttonIndex} */}
        </textPath>
      </text>
    )
  }
}
