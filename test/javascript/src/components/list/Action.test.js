import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import Action from "components/list/Action"

let container, action, indicator

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
  action = {
    id: 17,
    benchmark_indicator_id: 1,
    benchmark_technical_area_id: 1,
    sequence: 1,
    text:
      "Confirm that relevant legislation, laws, regulatio… of IHR implementation based on the risk profile.",
    level: 5,
  }
  indicator = {
    id: 1,
    benchmark_technical_area_id: 1,
    sequence: 1,
    display_abbreviation: "1.1",
    objective:
      "To assess, adjust and align domestic legislation, laws, regulations, policy and administrative requirements in all relevant sectors t…",
    text:
      "Domestic legislation, laws, regulations, policy an…rs and effectively enable compliance with the IHR",
  }
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it("TechnicalArea has the expected ordinal and title", () => {
  act(() => {
    ReactDOM.render(<Action action={action} indicator={indicator} />, container)
  })
  expect(container.innerHTML).toMatch(action.text)
  expect(container.innerHTML).toMatch(indicator.display_abbreviation)
})
