import React from "react"
import { useSelector } from "react-redux"
import TechnicalArea from "./TechnicalArea"

const ActionListByTechnicalArea = () => {
  const technicalAreas = useSelector((state) => state.technicalAreas)
  return technicalAreas.map((technicalArea) => {
    return (
      <TechnicalArea technicalArea={technicalArea} key={technicalArea.id} />
    )
  })
}

export default ActionListByTechnicalArea
