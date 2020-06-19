import React from "react"
import ReactDOM from "react-dom"
import { act } from "react-dom/test-utils"
import { useSelector } from "react-redux"
import { LIST_MODE_BY_ACTION_TYPE } from "config/constants"
import ActionListByActionType from "components/list/ActionListByActionType"

jest.mock("components/list/Action", () => () => <mock-action />)
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}))

let container
beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
  const selectedActionTypeOrdinal = LIST_MODE_BY_ACTION_TYPE
  const action1 = { id: 17, action_types: null }
  const action2 = { id: 19, action_types: [selectedActionTypeOrdinal] }
  const action3 = { id: 37, action_types: [3, selectedActionTypeOrdinal] }
  const action4 = { id: 41, action_types: [3, 17, selectedActionTypeOrdinal] }
  const action5 = { id: 47, action_types: [] }
  const action6 = { id: 53, action_types: [selectedActionTypeOrdinal] }
  useSelector
    .mockImplementationOnce((callback) =>
      callback({
        // action6 intentionally omitted from next line because in this exmaple it does not belong to the plan
        planActionIds: [
          action1.id,
          action2.id,
          action3.id,
          action4.id,
          action5.id,
        ],
      })
    )
    .mockImplementationOnce((callback) => {
      const actions = {}
      actions[action1.id] = action1
      actions[action2.id] = action2
      actions[action3.id] = action3
      actions[action4.id] = action4
      actions[action5.id] = action5
      actions[action6.id] = action6
      return callback({
        actions: actions,
      })
    })
    .mockImplementationOnce((callback) =>
      callback({
        selectedActionTypeOrdinal: selectedActionTypeOrdinal,
      })
    )
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it("when passed 3 Action Ids it renders 3 Action component children", () => {
  act(() => {
    ReactDOM.render(<ActionListByActionType />, container)
  })
  const foundActionListByActionTypeComponents = container.querySelectorAll(
    "mock-action"
  )

  expect(foundActionListByActionTypeComponents.length).toEqual(3)
})
