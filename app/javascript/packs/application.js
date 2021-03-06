// NB: please refer to the section in README.md ## A note on js packs and stylesheets
import "./base"

// capture any unhandled JS errors/exceptions. for more info: https://docs.sentry.io/platforms/javascript/
import * as Sentry from "@sentry/browser"
Sentry.init({
  dsn:
    "https://c84eed83155c4190a082ceb3709dd06a@o152587.ingest.sentry.io/1551856",
})

// stimulus polyfill must be loaded first, also needed for IE 10 to work properly
import "@stimulus/polyfills"
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

// jquery-ujs is used by some rails form helpers
import "jquery-ujs" //eslint-disable-line
import "chosen-js"
import "chosen-js/chosen.css"

const application = Application.start()
const context = require.context("../src/controllers", true, /\.js$/)
application.load(definitionsFromContext(context))

// fix for IE Benchmarks doc page Monitoring icon too small/out of alignment #171365469
$(".benchmark-document .callout-with-icon svg.bar-chart path").attr(
  "transform",
  "scale(2)"
)

const componentRequireContext = require.context("src/components", true)
const ReactRailsUJS = require("react_ujs")
ReactRailsUJS.useContext(componentRequireContext) //eslint-disable-line react-hooks/rules-of-hooks

$(ReactRailsUJS.mountComponents)
