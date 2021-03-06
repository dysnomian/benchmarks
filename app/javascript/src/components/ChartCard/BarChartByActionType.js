import React from "react"
import { connect } from "react-redux"
import ChartistGraph from "react-chartist"
import PropTypes from "prop-types"
import $ from "jquery"
import { selectActionType } from "../../config/actions"
import {
  countActionsByActionType,
  getAllActions,
  getMatrixOfActionCountsByActionTypeAndDisease,
  getPlanActionIds,
  getPlanChartLabels,
  getSelectedActionTypeOrdinal,
  getSelectedChartTabIndex,
} from "../../config/selectors"
import { offsetTheChartSegmentLabelsForIE } from "./ChartFixesForIE"

class BarChartByActionType extends React.Component {
  constructor(props) {
    super(props)
    this.chartLabels = this.props.chartLabels[1]
    this.tooltipNodesFromPreviousRender = []
  }

  render() {
    const { data, options } = this.getBarChartOptions(
      this.props.countActionsByActionType,
      this.props.matrixOfActionCountsByActionTypeAndDisease,
      this.chartLabels
    )
    this.updateChartSize()
    return (
      <div className="chart-container ct-chart-bar">
        <ChartistGraph
          data={data}
          options={options}
          type="Bar"
          ref={(ref) => {
            if (ref) this.chartistGraphInstance = ref
          }}
          listener={{ created: this.initInteractivityForChart.bind(this) }}
        />
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateChartSize.bind(this))
    window.addEventListener(
      "orientationchange",
      this.updateChartSize.bind(this)
    )
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateChartSize.bind(this))
    window.removeEventListener(
      "orientationchange",
      this.updateChartSize.bind(this)
    )
  }

  // NB: the purpose of this method is to assist the chart in fitting into its container by simply calling chartist.update()
  //   this is needed in these cases:
  //   1) when selected tab is changed and chart re-renders, it will have been rendered too small due to having been in the hidden in the DOM
  //   2) when the size of the window is changed (primarily for desktop-style web browsers)
  //   3) when the orientation of the screen is changed thereby changing the size of the screen (primarily mobile-style web browsers: phones, tables, etc)
  updateChartSize() {
    setTimeout(() => {
      this.chartistGraphInstance.chartist.update()
      offsetTheChartSegmentLabelsForIE(
        this.chartistGraphInstance.chartist.container
      )
    }, 0)
  }

  getBarChartOptions(
    countActionsByActionType,
    matrixOfActionCountsByActionTypeAndDisease,
    chartLabels
  ) {
    let data = {
      labels: chartLabels,
      series: matrixOfActionCountsByActionTypeAndDisease,
    }
    const heightValue = this.getNextMultipleOfTenForSeries(
      countActionsByActionType
    )
    let options = {
      high: heightValue,
      low: 0,
      width: this.props.width,
      height: this.props.height,
      stackBars: true,
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
    const dispatch = this.props.dispatch
    const countActionsByActionType = this.props.countActionsByActionType
    const matrixOfActionCountsByActionTypeAndDisease = this.props
      .matrixOfActionCountsByActionTypeAndDisease
    const chartistGraph = this.chartistGraphInstance
    const selectedActionTypeOrdinal = this.props.selectedActionTypeOrdinal
    const chartLabels = this.chartLabels
    chartistGraph.chartist.detach()
    const domNode = chartistGraph.chart
    const seriesA = $(".ct-series-a .ct-bar", domNode)
    const seriesB = $(".ct-series-b .ct-bar", domNode)
    seriesA.removeClass("ct-deselected")
    seriesB.removeClass("ct-deselected")

    this.cleanupTooltipsFromPreviousRender()
    offsetTheChartSegmentLabelsForIE(domNode)

    for (let i = 0; i < countActionsByActionType.length; i++) {
      const objOfActionCounts = {
        general: matrixOfActionCountsByActionTypeAndDisease[0][i],
        influenza: matrixOfActionCountsByActionTypeAndDisease[1][i],
      }
      const $elBarSegmentA = $(seriesA[i])
      const $elBarSegmentB = $(seriesB[i])
      if (selectedActionTypeOrdinal && i !== selectedActionTypeOrdinal - 1) {
        $elBarSegmentA.addClass("ct-deselected")
        $elBarSegmentB.addClass("ct-deselected")
      }
      this.initTooltipForSegmentOfChart(
        objOfActionCounts,
        chartLabels[i],
        $elBarSegmentA,
        $elBarSegmentB
      )
      this.initClickHandlerForChart(dispatch, i, $elBarSegmentA, $elBarSegmentB)
    }
  }

  cleanupTooltipsFromPreviousRender() {
    for (const $tooltipEl of this.tooltipNodesFromPreviousRender) {
      $tooltipEl.tooltip("dispose")
    }
    this.tooltipNodesFromPreviousRender = []
  }

  initTooltipForSegmentOfChart(
    objOfActionCounts,
    nameOfActionType,
    $elBarSegmentA,
    $elBarSegmentB
  ) {
    const tooltipTitle = this.getTooltipHtmlContent(
      nameOfActionType,
      objOfActionCounts
    )
    const stackedBarEls = [$elBarSegmentA, $elBarSegmentB]
    stackedBarEls.forEach(($elBarSegment) => {
      $elBarSegment
        .attr("title", tooltipTitle)
        .attr("data-toggle", "tooltip")
        .attr("data-html", true)
        .tooltip({ container: ".plan-container" })
        .tooltip()

      this.tooltipNodesFromPreviousRender.push($elBarSegment)
    })
  }

  getTooltipHtmlContent(nameOfActionType, objOfActionCounts) {
    const sumOfCounts = objOfActionCounts.general + objOfActionCounts.influenza
    let tooltipHtml = `
        <strong>
          ${nameOfActionType}: ${sumOfCounts}
        </strong>
    `
    if (objOfActionCounts.influenza > 0) {
      tooltipHtml = `${tooltipHtml}
        <div>&nbsp;</div>
        <div>Health System: ${objOfActionCounts.general}</div>
        <div>Influenza-specific: ${objOfActionCounts.influenza}</div>
      `
    }
    return tooltipHtml
  }

  initClickHandlerForChart(
    dispatch,
    segmentIndex,
    $elBarSegmentA,
    $elBarSegmentB
  ) {
    const stackedBarEls = [$elBarSegmentA, $elBarSegmentB]
    stackedBarEls.forEach(($elBarSegment) => {
      $elBarSegment.on("click", () => {
        dispatch(selectActionType(segmentIndex))
      })
    })
  }
}

BarChartByActionType.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  chartLabels: PropTypes.array.isRequired,
  planActionIds: PropTypes.array.isRequired,
  allActions: PropTypes.array.isRequired,
  dispatch: PropTypes.func,
  countActionsByActionType: PropTypes.array.isRequired,
  matrixOfActionCountsByActionTypeAndDisease: PropTypes.array.isRequired,
  selectedActionTypeOrdinal: PropTypes.number,
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    chartLabels: getPlanChartLabels(state),
    planActionIds: getPlanActionIds(state),
    allActions: getAllActions(state),
    countActionsByActionType: countActionsByActionType(state),
    matrixOfActionCountsByActionTypeAndDisease: getMatrixOfActionCountsByActionTypeAndDisease(
      state
    ),
    selectedActionTypeOrdinal: getSelectedActionTypeOrdinal(state),
    selectedChartTabIndex: getSelectedChartTabIndex(state),
  }
}

export default connect(mapStateToProps)(BarChartByActionType)
