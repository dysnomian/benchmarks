import React from "react"
import { useSelector } from "react-redux"

const ActionCount = () => {
  const countOfPlanActivityIds = useSelector(
    (state) => state.planActivities.length
  )

  return (
    <div className="row activity-count-header align-items-center mx-0">
      <div className="activity-count-circle col-auto d-flex flex-column align-items-center justify-content-center">
        <span>{countOfPlanActivityIds}</span>
      </div>
      <div className="col-auto">
        <p>Total Actions</p>
      </div>
    </div>
  )
}

export default ActionCount
