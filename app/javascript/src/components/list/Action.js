import React from "react"
import PropTypes from "prop-types"

const Action = (props) => {
  const indicator = props.indicator
  const action = props.action
  const onDeleteAction = props.onDeleteAction

  console.log(`RENDER Action:: `, indicator.display_abbreviation)
  return (
    <div className="action row p-2">
      <div className="col-auto d-flex flex-row align-items-center">
        <span
          className={`badge badge-pill badge-success badge-rounded-circle color-value-${action.level}`}
        >
          <span className="action-level">{action.level}</span>
        </span>
      </div>
      <div className="col-10">
        <strong>{indicator.display_abbreviation}</strong>
        &nbsp;
        <span className="action-text">{action.text}</span>
      </div>
      <div className="col">
        <button className="delete close" type="button" onClick={onDeleteAction}>
          <img src="/delete-button.svg" alt="Delete this action" />
        </button>
      </div>
    </div>
  )
}

Action.propTypes = {
  indicator: PropTypes.object.isRequired,
  action: PropTypes.object.isRequired,
  onDeleteAction: PropTypes.func.isRequired,
}

export default Action
