import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import reducers from "../config/reducers"
import ActionCount from "./ActionCount"
import ActionListByTechnicalArea from "./list/ActionListByTechnicalArea"

class PlanEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = configureStore({
      reducer: reducers,
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <ActionCount />
        <ActionListByTechnicalArea />
      </Provider>
    )
  }
}

PlanEditPage.propTypes = {}

export default PlanEditPage
