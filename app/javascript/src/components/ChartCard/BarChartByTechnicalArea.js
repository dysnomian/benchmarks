import React from "react"
import { connect } from "react-redux"
import ChartistGraph from "react-chartist"
import PropTypes from "prop-types"
import $ from "jquery"

class BarChartByTechnicalArea extends React.Component {
  constructor(props) {
    // console.log(`GVT: BarChartByTechnicalArea.constructor called..`)
    super(props)
    if (!this.chartistGraphInstance) {
      this.chartistGraphInstance = null // will be a ref to the chartist instance
    }
  }

  render() {
    // console.log(
    //   `GVT: BarChartByTechnicalArea.render called.. this.props.planActionIds.length: `,
    //   this.props.planActionIds.length
    // )
    const chartLabels = this.props.chartLabels[0]
    const countActionsByTechnicalArea = this.constructor.countActionsByTechnicalArea(
      this.props.planActionIds,
      this.props.allActions
    )
    const { data, options } = this.getBarChartOptions(
      countActionsByTechnicalArea,
      chartLabels
    )
    // console.log(
    //   `GVT: countActionsByTechnicalArea: `,
    //   countActionsByTechnicalArea,
    //   data
    // )
    return (
      <div className="chart-container ct-chart-bar">
        <ChartistGraph
          data={data}
          options={options}
          type="Bar"
          ref={(ref) => {
            if (ref) this.chartistGraphInstance = ref
          }}
          listener={{
            created: this.initInteractivityForChart.bind(
              this,
              countActionsByTechnicalArea
            ),
          }}
        />
      </div>
    )
  }

  // TODO: refactor this and methods like it that perform non-React DOM operations/augmentation/manipulation to a module
  getBarChartOptions(chartDataSeries, chartLabels) {
    const dataSet = chartDataSeries
    let data = {
      labels: chartLabels,
      series: [dataSet],
    }
    const heightValue = this.getNextMultipleOfTenForSeries(dataSet)
    let options = {
      high: heightValue,
      low: 0,
      width: this.props.width,
      height: this.props.height,
      axisY: {
        // show multiples of 10
        labelInterpolationFnc: function (value) {
          return value % 10 == 0 ? value : null
        },
      },
    }
    return {
      data,
      options,
    }
  }

  getNextMultipleOfTenForSeries(seriesArray) {
    const maxInt = Math.max(...seriesArray)
    const currentMultipleOfTen = Math.floor(maxInt / 10)
    return (currentMultipleOfTen + 1) * 10
  }

  initInteractivityForChart() {
    const countActionsByTechnicalArea = this.constructor.countActionsByTechnicalArea(
      this.props.planActionIds,
      this.props.allActions
    )
    const chartistGraph = this.chartistGraphInstance
    // console.log(`GVT: initInteractivityForChart.. `, chartistGraph)
    chartistGraph.chartist.detach()
    const domNode = chartistGraph.chart
    $("line.ct-bar", domNode).each((segmentIndex, el) => {
      let $elBarSegment = $(el)
      // this.initClickHandlerForChartByTechnicalArea(
      //   $elBarSegment,
      //   segmentIndex
      // )
      this.initTooltipForSegmentOfChartByTechnicalArea(
        $elBarSegment,
        segmentIndex,
        countActionsByTechnicalArea[segmentIndex]
      )
    })
  }

  initTooltipForSegmentOfChartByTechnicalArea(
    $elBarSegment,
    index,
    countActions
  ) {
    // console.log(`GVT: initTooltipForSegmentOfChartByTechnicalArea: `, index, countActions)
    const tooltipTitle = `${this.props.technicalAreas[index].text}: ${countActions}`
    $($elBarSegment)
      .attr("title", tooltipTitle)
      .attr("data-toggle", "tooltip")
      .tooltip({ container: ".plan-container" })
      .tooltip()
  }

  static countActionsByTechnicalArea(actionIds, actions) {
    let currentActions = this.getActionsForIds(actions, actionIds)
    return currentActions.reduce((acc, action) => {
      const currentindex = action.benchmark_technical_area_id - 1
      acc[currentindex]++
      return acc
    }, Array(18).fill(0))
  }

  static getActionsForIds(actions, actionIds) {
    return actions.filter((action) => actionIds.indexOf(action.id) > 0)
  }
}

BarChartByTechnicalArea.propTypes = {
  technicalAreas: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  chartLabels: PropTypes.array.isRequired,
  chartDataSeries: PropTypes.array.isRequired,
  planActionIds: PropTypes.array.isRequired,
  allActions: PropTypes.array.isRequired,
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    technicalAreas: state.technicalAreas,
    chartLabels: state.planChartLabels,
    chartDataSeries: state.planChartSeries,
    planActionIds: state.planActionIds,
    allActions: state.allActions,
  }
}

export default connect(mapStateToProps)(BarChartByTechnicalArea)
