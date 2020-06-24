import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import PlanEditPage from "components/PlanEditPage"

let container
jest.mock("components/ActionCount", () => () => <mock-actioncount />)
jest.mock("components/ChartCard/ChartCard", () => () => <mock-chartcard />)
jest.mock("components/list/ActionList", () => () => <mock-actionlist />)
container = document.createElement("div")

beforeEach(() => {
  window.STATE_FROM_SERVER = stubStateFromServer()
  window.NUDGES_BY_ACTION_TYPE = []
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it("renders the expected child components", () => {
  act(() => {
    ReactDOM.render(<PlanEditPage />, container)
  })

  expect(container.querySelectorAll("mock-actioncount").length).toEqual(1)
  expect(container.querySelectorAll("mock-chartcard").length).toEqual(1)
  expect(container.querySelectorAll("mock-actionlist").length).toEqual(1)
})

function stubStateFromServer() {
  return {
    technicalAreas: [],
    indicators: [],
    actions: [],
    planActionIds: [],
    planActionIdsByIndicator: {},
    planActionIdsNotInIndicator: {},
    planChartLabels: [],
    allActions: [],
    selectedTechnicalAreaId: null,
    planGoals: [],
    plan: {},
  }
}
