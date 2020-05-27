import React from "react"
import { useSelector } from "react-redux"

const ActivityCount = () => {
  const activities = useSelector((state) => state.activities)

  return (
    <div className="row mx-0 activity-count-header align-items-center">
      <div className="activity-count-circle col-auto d-flex flex-column align-items-center justify-content-center">
        <span>{activities.length}</span>
      </div>
      <div className="col-auto">
        <p>Total Activities</p>
      </div>
    </div>
  )
}

export default ActivityCount
