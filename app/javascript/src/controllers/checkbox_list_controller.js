import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["listItem", "submitForm"]

  connect() {
    this.updateState()
  }

  updateState() {
    const selected = this.listItemTargets.filter(target => target.checked)
    this.submitFormTarget.disabled = selected.length === 0
  }

  selectAll(e) {
    this.listItemTargets.forEach(target => (target.checked = true))
    this.updateState()
  }

  deselectAll(e) {
    this.listItemTargets.forEach(target => (target.checked = false))
    this.updateState()
  }
}
