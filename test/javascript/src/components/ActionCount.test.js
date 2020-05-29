import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import ActionCount from "../../../../app/javascript/src/components/ActionCount"

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
  useSelector: jest
    .fn()
    .mockImplementation((state) => state({ planActionIds: [12, 34, 57] })),
}))

it("ActionCount populates itself with the expected integer", () => {
  act(() => {
    ReactDOM.render(<ActionCount />, container)
  })
  const span = container.querySelector("span")
  expect(span.textContent).toEqual("3")
})
