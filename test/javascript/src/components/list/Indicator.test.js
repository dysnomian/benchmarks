import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import Indicator from "../../../../app/javascript/src/components/list/Indicator"

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

it("ActionCount populates itself with the expected integer", () => {
  act(() => {
    ReactDOM.render(<Indicator indicator={indicatorJson} />, container)
  })
  const bold = container.querySelector("b")
  expect(bold.textContent).toContain(
    `Benchmark ${indicatorJson.display_abbreviation}`
  )
})
