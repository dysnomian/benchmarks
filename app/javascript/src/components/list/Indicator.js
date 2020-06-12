import React from "react"
import PropTypes from "prop-types"
import AddAction from "./AddAction"
import IndicatorActionList from "./IndicatorActionList"

const Indicator = (props) => {
  const indicator = props.indicator

  return (
    <div className="benchmark-container col">
      <div className="row bg-light-gray px-2 header">
        <div className="col-11">
          <b>Benchmark {indicator.display_abbreviation}:</b>
          &nbsp;
          {indicator.text}
        </div>
      </div>
      <IndicatorActionList indicator={indicator} />
      <AddAction indicator={indicator} />
    </div>
  )
}

Indicator.propTypes = {
  indicator: PropTypes.object.isRequired,
}

export default Indicator
