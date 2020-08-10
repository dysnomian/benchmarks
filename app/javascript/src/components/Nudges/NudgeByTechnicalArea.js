import React from "react"
import { useSelector } from "react-redux"
import NudgeByTechnicalAreaOneYear from "./NudgeByTechnicalAreaOneYear"
import NudgeByTechnicalAreaFiveYear from "./NudgeByTechnicalAreaFiveYear"

const NudgeByTechnicalArea = () => {
  let whichNudgeComponent
  const plan = useSelector((state) => state.plan)
  if (plan.term === 500) {
    whichNudgeComponent = <NudgeByTechnicalAreaFiveYear />
  } else {
    whichNudgeComponent = <NudgeByTechnicalAreaOneYear />
  }
  return (
    <>
      <div className="col-auto d-flex flex-column justify-content-center nudge-left">
        <div className="nudge-tip-text">Tips for</div>
        <h4 className="my-0">Your draft plan</h4>
      </div>
      <div className="col">{whichNudgeComponent}</div>
    </>
  )
}

export default NudgeByTechnicalArea
