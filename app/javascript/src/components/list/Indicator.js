import React from "react"
import PropTypes from "prop-types"
import { useSelector, useStore } from "react-redux"
import Action from "./Action"
import getPlanActionIdsByIndicator from "../../config/selectors"

const Indicator = (props) => {
  const indicator = props.indicator
  const store = useStore()
  const state = store.getState()
  const planActionIdsByIndicator = getPlanActionIdsByIndicator(state)
  const allActions = useSelector((state) => {
    return state.actions
  })
  const actionIds = planActionIdsByIndicator[indicator.id]
  const actionDataObjects = allActions.filter(
    (a) => actionIds.indexOf(a.id) >= 0
  )
  const compsForActions = actionDataObjects.map((actionData) => {
    return (
      <Action action={actionData} indicator={indicator} key={actionData.id} />
    )
  })

  return (
    <div className="benchmark-container col">
      <div className="row bg-light-gray px-2 header">
        <div className="col-11">
          <b>Benchmark {indicator.display_abbreviation}:</b>
          &nbsp;
          {indicator.text}
        </div>
      </div>
      {compsForActions}
    </div>
  )
}

Indicator.propTypes = {
  indicator: PropTypes.object.isRequired,
}

export default Indicator
