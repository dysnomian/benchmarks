import React from "react"
import { useSelector } from "react-redux"

const ActionCount = () => {
  const countOfPlanActionIds = useSelector((state) => {
    return state.planActionIds.length
  })

  return (
    <div className="row action-count-header align-items-center mx-0">
      <div className="action-count-circle col-auto d-flex flex-column align-items-center justify-content-center">
        <span>{countOfPlanActionIds}</span>
      </div>
      <div className="col-auto">
        <p>Total Actions</p>
      </div>
    </div>
  )
}

export default ActionCount
