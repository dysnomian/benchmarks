import React from "react"
import { connect } from "react-redux"
import ChartistGraph from "react-chartist"
import PropTypes from "prop-types"
import $ from "jquery"

class BarChartByTechnicalArea extends React.Component {
  constructor(props) {
    super(props)
    this.chartWidth = props.width
    this.chartHeight = props.height
    this.chartLabels = props.chartLabels[0]
    this.chartDataSeries = props.chartDataSeries[0]
    this.el = React.createRef()
    this.chartistGraphComponent = React.createRef()
    this.technicalAreas = props.technicalAreas
  }

  // componentDidMount() {
  //   console.log("GVT BarChartByTechnicalArea.componentDidMount..")
  // }

  componentWillUnmount() {
    console.log("GVT BarChartByTechnicalArea.componentWillUnmount..")
    // Could add event listeners like so: this.chartistGraphComponent.chartist.on("created", () {...})
    this.chartistGraphComponent.chartist.detach()
  }

  render() {
    const { data, options } = this.getBarChartOptions()
    return (
      <div
        className="chart-container ct-chart-bar"
        ref={(ref) => (this.el = ref)}
      >
        <ChartistGraph
          data={data}
          options={options}
          type="Bar"
          ref={(ref) => (this.chartistGraphComponent = ref)}
          listener={{ created: this.initInteractivityForChart.bind(this) }}
        />
      </div>
    )
  }

  initInteractivityForChart() {
    console.log(`GVT: initInteractivityForChart..`)
    this.initInteractionForChartByTechnicalArea()
  }

  // TODO: refactor this and methods like it that perform non-React DOM operations/augmentation/manipulation to a module
  getBarChartOptions() {
    const dataSet = this.chartDataSeries
    let data = {
      labels: this.chartLabels,
      series: [dataSet],
    }
    const heightValue = this.getNextMultipleOfTenForSeries(dataSet)
    let options = {
      high: heightValue,
      low: 0,
      width: this.chartWidth,
      height: this.chartHeight,
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

  initInteractionForChartByTechnicalArea(domNode) {
    $("line.ct-bar", domNode).each((segmentIndex, el) => {
      let $elBarSegment = $(el)
      // this.initClickHandlerForChartByTechnicalArea(
      //   $elBarSegment,
      //   segmentIndex
      // )
      this.initTooltipForSegmentOfChartByTechnicalArea(
        $elBarSegment,
        segmentIndex
      )
    })
  }

  initTooltipForSegmentOfChartByTechnicalArea($elBarSegment, index) {
    const tooltipTitle = this.technicalAreas[index].text
    $($elBarSegment)
      .attr("title", tooltipTitle)
      .attr("data-toggle", "tooltip")
      .tooltip({ container: ".plan-container" })
      .tooltip()
  }
}

BarChartByTechnicalArea.propTypes = {
  technicalAreas: PropTypes.array.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  chartLabels: PropTypes.array.isRequired,
  chartDataSeries: PropTypes.array.isRequired,
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    technicalAreas: state.technicalAreas,
    chartLabels: state.planChartLabels,
    chartDataSeries: state.planChartSeries,
  }
}

export default connect(mapStateToProps)(BarChartByTechnicalArea)
