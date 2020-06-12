import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import Indicator from "components/list/Indicator"

let container

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

const indicatorJson = {
  id: 1,
  benchmark_technical_area_id: 1,
  sequence: 1,
  display_abbreviation: "1.1",
  text:
    "Domestic legislation, laws, regulations, policy an…rs and effectively enable compliance with the IHR",
}

jest.mock("components/list/IndicatorActionList", () => () => (
  <mock-indicator-list />
))
jest.mock("components/list/AddAction", () => () => <mock-add-action />)

it("Indicator populates itself with the correct information", () => {
  act(() => {
    ReactDOM.render(<Indicator indicator={indicatorJson} />, container)
  })
  console.log(container.textContent)
  expect(container.textContent).toContain(indicatorJson.text)
  expect(container.querySelectorAll("mock-indicator-list").length).toEqual(1)
  expect(container.querySelectorAll("mock-add-action").length).toEqual(1)
})
