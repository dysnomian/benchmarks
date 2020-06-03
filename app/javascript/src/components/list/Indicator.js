import React from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import Action from "./Action"
import recalcPlanActionIdsByIndicator from "../../config/selectors"
import { DELETE_ACTION } from "../../constants"

const Indicator = (props) => {
  const indicator = props.indicator
  const dispatch = useDispatch()
  const onDeleteAction = (actionId) => {
    return () => {
      dispatch({ type: DELETE_ACTION, payload: { id: actionId } })
    }
  }
  const actions = useSelector((state) => state.actions, shallowEqual)
  const planActionIdsByIndicator = useSelector((state) => {
    return recalcPlanActionIdsByIndicator(state)
  })
  const actionIds = planActionIdsByIndicator[indicator.id]
  const actionDataObjects = actions.filter((a) => actionIds.indexOf(a.id) >= 0)
  const compsForActions = actionDataObjects.map((actionData) => {
    const actionId = actionData.id
    return (
      <Action
        action={actionData}
        indicator={indicator}
        key={actionId}
        onDeleteAction={onDeleteAction(actionId)}
      />
    )
  })

  console.log(
    `RENDER Indicator:: `,
    indicator.display_abbreviation,
    compsForActions.length
  )
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
