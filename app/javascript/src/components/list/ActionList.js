import React from "react"
import { useSelector } from "react-redux"
import TechnicalArea from "./TechnicalArea"

const ActionList = () => {
  const technicalAreas = useSelector((state) => state.technicalAreas)
  // console.log(`GVT: technicalAreas: ${technicalAreas.map(asd => asd.text)}`)

  const jsxOut = technicalAreas.map((technicalArea) => {
    return (
      <TechnicalArea
        technicalArea={technicalArea}
        sequence={technicalArea.sequence}
        key={technicalArea.id}
      />
    )
  })
  // console.log(`GVT: jsxOut: ${jsxOut}`)

  return jsxOut
}

export default ActionList
