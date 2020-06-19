import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import { useSelector } from "react-redux"
import IndicatorActionList from "components/list/IndicatorActionList"

let container
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}))
jest.mock("components/list/Action", () => () => <mock-action />)

it("TechnicalArea has the expected ordinal and title", () => {
  useSelector.mockImplementation((callback) =>
    callback({
      planActionIdsByIndicator: { 17: [2, 5, 7, 11, 13] },
    })
  )
  act(() => {
    ReactDOM.render(<IndicatorActionList indicator={{ id: 17 }} />, container)
  })
  const foundActionComponents = container.querySelectorAll("mock-action")
  expect(foundActionComponents.length).toEqual(5)
})
