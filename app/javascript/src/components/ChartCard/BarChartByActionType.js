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
      this.offsetTheChartSegmentLabelsForIE()
    }, 0)
  }

  // TODO: refactor this and methods like it that perform non-React DOM operations/augmentation/manipulation to a module
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

  //
  // The problem: needed a method to detect IE 10 and 11 for the purpose of working around an IE-specific
  //   issue, namely what the offsetTheChartSegmentLabelsForIE method addresses.
  //
  // Attempted solutions: First I tried to use Modernizr https://modernizr.com/ to take a
  //   feature-detection approach to working around the issue (as opposed to browser detection, which is not as
  //   good as a feature detection approach). At the time I tried it, Modernizr offered no detector for CSS transforms
  //   for SVG. The closest thing I found was this issue on the Modernizr repo which is still
  //   open/unmerged/unresolved: https://github.com/Modernizr/Modernizr/issues/1985
  //   Also looked into 3rd party libraries to handle this, most of which check the user agent string which is known to
  //   be an imperfect method, and would have required us to add yet another 3rd party library which we would rather avoid anyways.
  //
  // The solution: a browser detection technique via `document.documentMode` which is present on
  //   MS Internet Explorer 6 - 11 which is sufficient for this purpose. We actually just wanted to target IE 10-11
  //  but this is fine: its a simple and reliable dection method and does not require the addition of any additional code/libraries.
  //
  isIE() {
    return !!document.documentMode
  }

  //
  // The problem: IE does not support CSS transforms on SVG elements, which is what we used to get those
  //   bar chart segment labels rendered at a 45º angle in modern web browsers. That does not work in IE 10/11.
  //
  // Attempted solutions: tried to do this in CSS which would have been better and easier with the IE-specific
  //  stylesheet that we already have, but could not get these offsets to take effect via CSS for IE.
  //
  // The solution: In conjunction with the writing mode change in the IE-specific stylesheet to render these
  //   elements sideways at 90º, apply X and Y offsets here via JavaScript to the SVG nodes (TEXT nodes in IE).
  //   The offsets are arbitrary, just what aligned with the bar chart segments in IE 11 and looked decent on IE 11.
  //
  offsetTheChartSegmentLabelsForIE() {
    if (!this.isIE()) {
      return
    }
    $(
      ".ct-label.ct-horizontal",
      this.chartistGraphInstance.chartist.container
    ).each((i, el) => {
      console.log(i, el)
      const offsetX = 15
      const offsetY = 12
      const $el = $(el)
      const curXcoord = parseInt($el.attr("x"))
      const curYcoord = parseInt($el.attr("y"))
      $el.attr("x", curXcoord + offsetX).attr("y", curYcoord - offsetY)
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
