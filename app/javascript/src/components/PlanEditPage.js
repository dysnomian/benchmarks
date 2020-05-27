import React from "react"
import activities from "../config/reducers"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import ActivityCount from "./ActivityCount"

class PlanEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = configureStore({
      reducer: activities,
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
