import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import reducersForActivities from "../config/reducers"
import ActivityCount from "./ActivityCount"

class PlanEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = configureStore({
      reducer: reducersForActivities,
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <ActivityCount />
      </Provider>
    )
  }
}

PlanEditPage.propTypes = {}

export default PlanEditPage
