import { Controller } from "stimulus"
import $ from "jquery"

import renderActivity from "../renderActivity"

export default class extends Controller {
  static targets = ["activityMap", "newActivity", "submit", "form"]

  connect() {
    this.newActivityTargets.forEach((t, i) => {
      $(t).autocomplete({
        source: this.autocompletions(t.getAttribute("data-benchmark-id")),
        open: e => {
          const menu = $("ul.ui-menu")[i]
          $(menu).width($(t.closest(".activity-form")).innerWidth() + 7)
          const { top, left } = $(menu).offset()
          $(menu).offset({ top: top + 8, left: left - 23 })
        },
        create: function() {
          $(this).data("ui-autocomplete")._renderMenu = function(ul, items) {
            const inRangeActivities = JSON.parse(
              t.getAttribute("data-in-range-activities")
            ).map(a => a.text)
            items.forEach(
              item =>
                inRangeActivities.includes(item.value) &&
                this._renderItemData(ul, item)
            )
            ul.append(
              `<li class='ui-autocomplete-category'>
                 -- Suggested Activities From Benchmarks --
               </li>`
            )
            items.forEach(
              item =>
                !inRangeActivities.includes(item.value) &&
                this._renderItemData(ul, item)
            )
          }
        }
      })
      $(t)
        .autocomplete("widget")
        .menu("option", "items", "> :not(.ui-autocomplete-category)")
    })
    if (document.referrer.match("goals")) {
      $("#draft-plan-review-modal").modal("show")
    }
  }

  deleteActivity(e) {
    const { currentTarget } = e
    const activityToDelete = currentTarget.getAttribute("data-activity")
    const benchmarkId = currentTarget.getAttribute("data-benchmark-id")

    const newActivityList = this.activityMap[benchmarkId].filter(
      a => a.text !== activityToDelete
    )
    this.activityMapTarget.value = JSON.stringify({
      ...this.activityMap,
      [benchmarkId]: newActivityList
    })
    currentTarget.closest(".row").classList.add("d-none")
    $(this.newActivity(benchmarkId)).autocomplete({
      source: this.autocompletions(benchmarkId)
    })
    this.validateActivityMap()
  }

  addNewActivity(e) {
    const { currentTarget } = e
    const benchmarkId = currentTarget.getAttribute("data-benchmark-id")
    if (e.keyCode === 13 && currentTarget.value.length) {
      this.activityMapTarget.value = JSON.stringify({
        ...this.activityMap,
        [benchmarkId]: [
          ...(this.activityMap[benchmarkId] || []),
          { text: currentTarget.value }
        ]
      })
      renderActivity(benchmarkId, currentTarget.value)
      $(currentTarget).autocomplete({
        source: this.autocompletions(benchmarkId)
      })
      e.target.value = ""
      e.preventDefault()
      this.validateActivityMap()
    }
  }

  autocompletions(benchmarkId) {
    return this.allActivities(benchmarkId).filter(
      a => this.currentActivities(benchmarkId).includes(a) === false
    )
  }

  currentActivities(benchmarkId) {
    return this.activityMap[benchmarkId].map(a => a.text)
  }

  allActivities(benchmarkId) {
    return JSON.parse(
      this.newActivity(benchmarkId).getAttribute("data-activities")
    )
  }

  newActivity(benchmarkId) {
    return this.newActivityTargets.find(
      t => t.getAttribute("data-benchmark-id") === benchmarkId
    )
  }

  validateName() {
    if (this.formTarget.checkValidity() === false) {
      this.submitTarget.setAttribute("disabled", "disabled")
    } else {
      this.submitTarget.removeAttribute("disabled")
    }
    this.formTarget.classList.add("was-validated")
  }

  validateActivityMap() {
    if (
      Object.keys(this.activityMap).every(
        key => this.activityMap[key].length === 0
      )
    ) {
      this.submitTarget.setAttribute("disabled", "disabled")
    } else {
      this.submitTarget.removeAttribute("disabled")
    }
  }

  submit() {
    this.formTarget.submit()
  }

  get activityMap() {
    return JSON.parse(this.activityMapTarget.value)
  }
}
