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

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest
    .fn()
    // FIXME KLUDGE: we are doing this mockReturnValueOnce and mockReturnValue because this is a work-around for wonks.
    //   - we tried to use mockImplementation but that didnt work
    //   - some or all of the time the component under test was called twice for unknown reasons and this messed up the mocking
    //   - mockReturnValue* methods ought to work in a more sensible way, but again, we are seeing some unpredictable behavior here
    //   - this works for now and is predictable. but its def bad/scary/improper and should be fixed.
    .mockReturnValueOnce({ 1: [17, 19], 2: [23] })
    .mockReturnValue([
      {
        id: 17,
        benchmark_indicator_id: 1,
        benchmark_technical_area_id: 1,
        text:
          "Confirm that relevant legislation, laws, regulatio… of IHR implementation based on the risk profile.",
        level: 5,
      },
      {
        id: 19,
        benchmark_indicator_id: 1,
        benchmark_technical_area_id: 1,
        text:
          "Double Confirm that relevant legislation, laws, regulatio… of IHR implementation based on the risk profile.",
        level: 5,
      },
      {
        id: 23,
        benchmark_indicator_id: 2,
        benchmark_technical_area_id: 1,
        text:
          "Identify and convene key stakeholders related to t…n and implementation of legislation and policies.",
        level: 2,
      },
    ]),
}))
jest.mock("components/list/action", () => () => <mock-action />)

it("ActionCount populates itself with the expected integer", () => {
  act(() => {
    ReactDOM.render(<Indicator indicator={indicatorJson} />, container)
  })
  const mockActionComponent = container.querySelectorAll("mock-action")
  expect(mockActionComponent.length).toEqual(2)
})
