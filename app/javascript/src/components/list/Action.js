import React from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import DELETE_ACTION from "../../constants"

const deleteAction = (action, dispatch) => {
  dispatch({ type: DELETE_ACTION, payload: { id: action.id } })
}

const Action = (props) => {
  const indicator = props.indicator
  const action = props.action
  const dispatch = useDispatch()

  return (
    <div className="action row p-2">
      <div className="col-auto d-flex flex-row align-items-center">
        <span
          className={`badge badge-pill badge-success badge-rounded-circle color-value-${action.level}`}
        >
          <span className="action-level">0</span>
        </span>
      </div>
      <div className="col-10">
        <strong>{indicator.display_abbreviation}</strong>
        &nbsp;
        <span className="action-text">{action.text}</span>
      </div>
      <div className="col">
        <button
          className="delete close"
          type="button"
          onClick={() => deleteAction(action, dispatch)}
        >
          <img src="/delete-button.svg" alt="Delete this action" />
        </button>
      </div>
    </div>
  )
}

Action.propTypes = {
  indicator: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
}

export default Action
