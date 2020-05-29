import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import PlanEditPage from "components/PlanEditPage"

let container
jest.mock("components/list/ActionListByTechnicalArea", () => () => (
  <mock-actionlistbytechnicalarea />
))
jest.mock("components/ActionCount", () => () => <mock-actioncount />)
container = document.createElement("div")

beforeEach(() => {
  window.STATE_FROM_SERVER = stubStateFromServer()
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it("ActionCount populates itself with the expected child components", () => {
  act(() => {
    ReactDOM.render(<PlanEditPage />, container)
  })
  const mockList = container.querySelectorAll("mock-actionlistbytechnicalarea")
  expect(mockList.length).toEqual(1)
  const mockActionCount = container.querySelectorAll("mock-actioncount")
  expect(mockActionCount.length).toEqual(1)
})

function stubStateFromServer() {
  return {
    technicalAreas: [],
    indicators: [],
    actions: [],
    plan: {},
    planActionIds: [],
  }
}
