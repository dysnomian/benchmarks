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
import $ from "jquery"

const isIE = () => {
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
const offsetTheChartSegmentLabelsForIE = (chartistContainer) => {
  console.log(
    `offsetTheChartSegmentLabelsForIE: chartistContainer: `,
    chartistContainer
  )
  if (!isIE()) {
    return
  }

  const x = $("#tabContentForTechnicalArea .ct-label.ct-horizontal")
  console.log(`offsetTheChartSegmentLabelsForIE: x: `, x.length, x[0])
  $(".ct-label.ct-horizontal", chartistContainer).each((i, el) => {
    // console.log(i, el)
    const offsetX = 15
    const offsetY = 12
    const $el = $(el)
    const curXcoord = parseInt($el.attr("x"))
    const curYcoord = parseInt($el.attr("y"))
    $el.attr("x", curXcoord + offsetX).attr("y", curYcoord - offsetY)
  })
}

export { isIE, offsetTheChartSegmentLabelsForIE }
