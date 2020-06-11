import React from "react"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import initReducers from "../config/reducers"
import ActionCount from "./ActionCount"
import ActionListByTechnicalArea from "./list/ActionListByTechnicalArea"
import ChartCard from "./ChartCard/ChartCard"

class PlanEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.store = configureStore({
      reducer: initReducers(),
    })
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="row">
          <div className="col mt-4">
            <ActionCount />
          </div>
        </div>

        <div className="row">
          <div className="col mt-4">
            <ChartCard />
          </div>
        </div>

        <div className="row">
          <div className="col mt-4">
            <ActionListByTechnicalArea />
          </div>
        </div>
      </Provider>
    )
  }
}

PlanEditPage.propTypes = {}

export default PlanEditPage
