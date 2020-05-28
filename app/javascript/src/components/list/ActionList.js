import React from "react"
import { useSelector } from "react-redux"
import TechnicalArea from "./TechnicalArea"

const ActionList = () => {
  const technicalAreas = useSelector((state) => state.technicalAreas)
  return technicalAreas.map((technicalArea) => {
    return (
      <TechnicalArea
        technicalArea={technicalArea}
        sequence={technicalArea.sequence}
        key={technicalArea.id}
      />
    )
  })
}

export default ActionList
