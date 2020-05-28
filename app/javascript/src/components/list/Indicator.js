import React from "react"
import PropTypes from "prop-types"

const Indicator = (props) => {
  const indicator = props.indicator

  return (
    <div className="benchmark-container col">
      <div className="row bg-light-gray px-2 header">
        <div className="col-11">
          <b>Benchmark {indicator.display_abbreviation} :</b>
          {indicator.text}
        </div>
      </div>
    </div>
  )
}

Indicator.propTypes = {
  indicator: PropTypes.object.isRequired,
}

export default Indicator
