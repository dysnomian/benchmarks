import React from "react"
import BarChartByTechnicalArea from "./BarChartByTechnicalArea"
import BarChartByActionType from "./BarChartByActionType"
import { connect } from "react-redux"

class ChartCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        {
          // Card for Bar Charts and Nudges
        }
        <div className="plan card">
          <ul className="nav nav-tabs pt-3" role="tablist">
            <li className="nav-item px-2">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#tabContentForTechnicalArea"
                id="tabForTechnicalArea"
                role="tab"
                aria-controls="technical-area"
                aria-selected="true"
              >
                Technical Area
              </a>
            </li>
            <li className="nav-item px-2">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#tabContentForActionType"
                id="tabForActionType"
                role="tab"
                aria-controls="action-type"
                aria-selected="false"
              >
                Action Type
              </a>
            </li>
          </ul>

          <div className="row tab-content">
            <div
              id="tabContentForTechnicalArea"
              aria-labelledby="tabForTechnicalArea"
              role="tabpanel"
              className="col-auto tab-pane fade show active"
            >
              <div className="row no-gutters">
                {
                  // Left Col
                }
                <div className="chart-pane col-lg d-flex flex-column align-items-center">
                  <h6 className="my-3">Actions per benchmark technical area</h6>
                  {
                    // Actual Chart, by Technical Area
                  }
                  <BarChartByTechnicalArea width="100%" height="240" />
                </div>

                {
                  // Right Col: Nudge for Technical Area 1-year plan
                  // TODO: this is static for now but will need to switch based on plan is 1-year or 5-year
                }
                <div
                  id="nudge-for-technical-area-1-year"
                  className="col nudge-container"
                >
                  <div className="card">
                    <p>
                      <svg
                        className="lightbulb"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.57877 15.4626V16.4098C8.57877 16.7633 8.35903 17.0639 8.05245 17.1754V17.4924C8.05245 17.9409 7.699 18.3044 7.26298 18.3044H4.6314C4.19538 18.3044 3.84193 17.9409 3.84193 17.4924V17.1754C3.53535 17.0639 3.31561 16.7633 3.31561 16.4098V15.4626C3.31561 15.2384 3.49235 15.0566 3.71035 15.0566H8.18403C8.40202 15.0566 8.57877 15.2384 8.57877 15.4626ZM3.8713 13.974C3.54541 13.974 3.25202 13.7683 3.13525 13.4554C1.85827 10.034 0.157715 10.3787 0.157715 6.93701C0.157715 3.64869 2.74998 0.982666 5.94719 0.982666C9.14439 0.982666 11.7367 3.64869 11.7367 6.93701C11.7367 10.3787 10.0361 10.034 8.75916 13.4554C8.64239 13.7683 8.34896 13.974 8.02311 13.974H3.8713ZM3.31561 6.93701C3.31561 5.44464 4.49614 4.23049 5.94719 4.23049C6.23788 4.23049 6.4735 3.98812 6.4735 3.68919C6.4735 3.39025 6.23788 3.14788 5.94719 3.14788C3.91571 3.14788 2.26298 4.84768 2.26298 6.93701C2.26298 7.23595 2.49864 7.47832 2.78929 7.47832C3.07995 7.47832 3.31561 7.23595 3.31561 6.93701Z" />
                      </svg>
                      Tips for your draft plan
                    </p>
                    <ul>
                      <li>
                        Focus on no more than 2-3 actions per technical area.
                      </li>
                      <li>
                        Consider reducing the number of technical areas included
                        and focus on the areas that scored low in your capacity
                        assessments or are identified as gaps in the AAR&apos;s
                        and simulation reviews.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="tabContentForActionType"
              aria-labelledby="tabForActionType"
              role="tabpanel"
              className="col-auto tab-pane fade"
            >
              <div className="row no-gutters">
                {
                  // Left Col
                }
                <div className="chart-pane col-lg d-flex mx-auto flex-column align-items-center">
                  <h6 className="my-3">Actions per action type</h6>
                  {
                    // Actual Chart, by Action Type
                  }
                  <BarChartByActionType width="100%" height="240" />
                </div>

                {
                  // Right Col
                }
                {
                  // <%= render "nudge_container", dom_id: "nudge-by-action-type" %>
                }
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connect()(ChartCard)
