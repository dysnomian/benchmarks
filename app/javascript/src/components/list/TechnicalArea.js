import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Indicator from "./Indicator"

const TechnicalArea = (props) => {
  const technicalArea = props.technicalArea
  const indicators = useSelector((state) => state.indicators)
  const indicatorsForTechnicalAreaId = indicators.filter((indicator) => {
    return technicalArea.id === indicator.benchmark_technical_area_id
  })

  const compsForIndicators = indicatorsForTechnicalAreaId.map((indicator) => {
    return <Indicator indicator={indicator} key={indicator.id} />
  })

  return (
    <>
      <h3>
        {technicalArea.sequence}. {technicalArea.text}
      </h3>
      {compsForIndicators}
    </>
  )
}

TechnicalArea.propTypes = {
  technicalArea: PropTypes.object.isRequired,
}

export default TechnicalArea
