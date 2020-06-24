import React from "react"
import { render as renderForConnect } from "../../../test-utils-for-react"
import ChartCard from "components/ChartCard/ChartCard"

jest.mock("components/ChartCard/BarChartByTechnicalArea", () => () => (
  <mock-BarChartByTechnicalArea />
))
jest.mock("components/ChartCard/BarChartByActionType", () => () => (
  <mock-BarChartByActionType />
))
jest.mock("components/ChartCard/NudgeByTechnicalArea", () => () => (
  <mock-NudgeByTechnicalArea />
))
jest.mock("components/ChartCard/NudgeByActionType", () => () => (
  <mock-NudgeByActionType />
))

it("ChartCard has one child BarChartByTechnicalArea component", () => {
  const renderedComponent = renderForConnect(<ChartCard />)
  const container = renderedComponent.container
  const mockBarchartbytechnicalarea = container.querySelectorAll(
    "mock-barchartbytechnicalarea"
  )

  expect(mockBarchartbytechnicalarea.length).toEqual(1)
})

it("ChartCard has one child BarChartByActionType component", () => {
  const renderedComponent = renderForConnect(<ChartCard />)
  const container = renderedComponent.container
  const mockBarchartbyactiontype = container.querySelectorAll(
    "mock-barchartbyactiontype"
  )

  expect(mockBarchartbyactiontype.length).toEqual(1)
})

it("ChartCard has one child NudgeByTechnicalArea component", () => {
  const renderedComponent = renderForConnect(<ChartCard />)
  const container = renderedComponent.container
  const mockBarchartbyactiontype = container.querySelectorAll(
    "mock-NudgeByTechnicalArea"
  )

  expect(mockBarchartbyactiontype.length).toEqual(1)
})

it("ChartCard has one child NudgeByActionType component", () => {
  const renderedComponent = renderForConnect(<ChartCard />)
  const container = renderedComponent.container
  const mockBarchartbyactiontype = container.querySelectorAll(
    "mock-NudgeByActionType"
  )

  expect(mockBarchartbyactiontype.length).toEqual(1)
})

it("ChartCard has the expected content children", () => {
  const renderedComponent = renderForConnect(<ChartCard />)
  const container = renderedComponent.container
  const elPlanCard = container.querySelectorAll(".plan.card")
  const elTabForTechnicalArea = container.querySelectorAll(
    "#tabForTechnicalArea"
  )
  const elTabForActionType = container.querySelectorAll("#tabForActionType")
  const elTabContentForTechnicalArea = container.querySelectorAll(
    "#tabContentForTechnicalArea"
  )
  const elTabContentForActionType = container.querySelectorAll(
    "#tabContentForActionType"
  )

  expect(elPlanCard.length).toEqual(1)
  expect(elTabForTechnicalArea.length).toEqual(1)
  expect(elTabForActionType.length).toEqual(1)
  expect(elTabContentForTechnicalArea.length).toEqual(1)
  expect(elTabContentForActionType.length).toEqual(1)
})
