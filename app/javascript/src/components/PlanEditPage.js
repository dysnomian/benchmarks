import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import initReducers from "../config/reducers"
import PlanEditForm from "./PlanEditForm"

class PlanEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = configureStore({
      reducer: initReducers(window.STATE_FROM_SERVER),
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <PlanEditForm stateToUpdateLater={window.STATE_FROM_SERVER} />
      </Provider>
    )
  }
}

PlanEditPage.propTypes = {}

export default PlanEditPage
