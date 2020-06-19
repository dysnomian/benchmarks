import React from "react"
import PropTypes from "prop-types"
import { useSelector } from "react-redux"
import Action from "./Action"

const IndicatorActionList = (props) => {
  const indicator = props.indicator
  const planActionIdsByIndicator = useSelector((state) => {
    return state.planActionIdsByIndicator
  })
  const actionIdsByIndicator = planActionIdsByIndicator[indicator.id]

  return actionIdsByIndicator.map((actionId) => {
    return (
      <Action id={actionId} key={"action-" + indicator.id + "-" + actionId} />
    )
  })
}

IndicatorActionList.propTypes = {
  indicator: PropTypes.object.isRequired,
}

export default IndicatorActionList
