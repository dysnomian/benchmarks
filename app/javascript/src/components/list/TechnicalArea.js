import React from "react"
import PropTypes from "prop-types"

const TechnicalArea = (props) => {
  const technicalArea = props.technicalArea
  // console.log(`GVT: technicalArea:`, technicalArea)
  // const allIndicators = props.indicators
  // const indicators = allIndicators.filter((indicator) => {
  //   technicalArea.id = indicator.benchmark_technical_area_id
  // })

  return (
    <h3>
      {technicalArea.sequence}. {technicalArea.text}
    </h3>
    // <Indicator />
  )
}

TechnicalArea.propTypes = {
  technicalArea: PropTypes.object.isRequired,
}

export default TechnicalArea
