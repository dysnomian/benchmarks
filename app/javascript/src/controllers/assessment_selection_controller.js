import { Controller } from "stimulus"
/* This controller handles all of the modal dialogue boxes involved with
 * assessment selection. The functions here support two different workflows
 * (and an envolving understanding of Stimulus).
 *
 * One workflow shows an assessment-selection dialogue in response to a country
 * selection done on the main page. The other shows a dialogue in response to a
 * simple button press. Each of these has somewhat different validation
 * semantics that perhaps do not go together flawlessly yet.
 *
 * Targets that provide data to the page:
 *   getStartedButton -- the green "Get Started" button that appears on the
 *   front page. The controller toggles the button's enabled/disabled status.
 *
 *   selectedCountryName -- this simply carries the country name, which is
 *   currently used to populate the country name in the dialogue copy.
 *
 *   selectedCountryModal -- this also carries the country name, solely for
 *   populating the country name in the dialogue copy. This is potentially a
 *   duplicate and should be evaluated for removal.
 *
 *   submitForm -- this is the button that allows the entire form to be
 *   submitted. The controller toggles the button's enabled/disabled status.
 *
 * Targets that provide page data to the controller:
 *
 *   selectables -- contains a JSON-encoded dictionary of all of the countries
 *   and their associated assessments. The server populates this in the page
 *   when it renders the page.
 *
 * Targets that can do both:
 *   selectedCountry -- allows the controller to change the current selected
 *   country option (which is currently used for the default value), but also
 *   allows the controller to read which country the user has selected on the
 *   page.
 *
 *   assessmentTypes -- this is the assessment types dropdown, and this
 *   controller clears and repopulates it whenever the country selection
 *   changes. The controller also reads it when determining whether the entire
 *   form is valid.
 */
export default class extends Controller {
  static targets = [
    "assessmentTypes",
    "getStartedButton",
    "selectedCountry",
    "selectables",
    "selectedCountryName",
    "selectedCountryModal",
    "submitForm"
  ]

  connect() {
    this.selectedCountryTarget.value = Object.keys(this.selectables)[0]
    this.selectCountry()
  }

  /* Open whatever assessment selection modal is on the page */
  openModal(e) {
    $("#assessment-selection-modal").modal()
  }

  /* For the split dialogue, validate that country before opening the
   * assessment selection modal. */
  openModalValidated(e) {
    if (this.isCountryValid()) this.openModal(e)
  }

  /* Verify that the current country selection is valid. All selections are
   * valid except for the placeholder. */
  isCountryValid() {
    return this.selectedCountryTarget.value !== "-- Select One --"
  }

  /* Verify that the assessment type is valid. Since the assessment type gets
   * auto-populated, the only possible invalid selection is the placeholder. */
  isAssessmentTypeValid() {
    return (
      this.assessmentTypesTarget.selectedOptions[0].value !== "-- Select One --"
    )
  }

  /* Enable the Get Started button (getStartedButton target) if the currently
   * selected country is valid. This should only be attached to a pulldown menu
   * on a page that has the getStartedButton target specified. */
  validateAndEnableGetStarted(e) {
    this.getStartedButtonTarget.disabled = !this.isCountryValid()
  }

  /* Enable the "Next" button if both the country and the assessment type are
   * valid. The Next button typically is a form submission, which should not be
   * allowed if the currently selected options are invalid. */
  validateAndEnableNext(e) {
    this.submitFormTarget.disabled = !(
      this.isCountryValid() && this.isAssessmentTypeValid()
    )
  }

  /* Populate the assessment selection pulldown whenever a country gets
   * selected. */
  selectCountry(e) {
    const countryName = this.selectedCountryTarget.value
    const assessmentTypes = [
      { type: "-- Select One --", text: "-- Select One --" }
    ].concat(this.selectables[countryName])
    while (this.assessmentTypesTarget.firstChild)
      this.assessmentTypesTarget.removeChild(
        this.assessmentTypesTarget.firstChild
      )
    assessmentTypes.forEach(type =>
      this.assessmentTypesTarget.add(new Option(type.text, type.type))
    )

    if (this.hasSelectedCountryNameTarget)
      this.selectedCountryNameTarget.textContent = countryName

    if (this.hasSelectedCountryModalTarget)
      this.selectedCountryModalTarget.value = countryName
  }

  /* Call this function when a country is selected on one of the pages that
   * displays the country selection and pops up the assessment selection modal
   * in response to a country being selected.
   *
   * This could technically be replaced with an action field that targets
   * `selectCountry` followed by `openModal`, and that would slightly simplify
   * what is currently an unweildy API.
   */
  selectCountryAndOpen(e) {
    this.selectCountry(e)
    this.openModal()
  }

  /* Special stimulus syntax. This retrieves the selectables target from the
   * page and processes it into an instance field in this Javascript
   * controller.
   */
  get selectables() {
    return JSON.parse(this.selectablesTarget.value)
  }
}
