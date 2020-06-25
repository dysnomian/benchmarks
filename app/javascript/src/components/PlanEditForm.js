import React from "react"
import ActionCount from "./ActionCount"
import ChartCard from "./ChartCard/ChartCard"
import ActionList from "./list/ActionList"
import { useDispatch, useSelector } from "react-redux"
import { authenticityToken } from "../config/selectors"
import { updatePlanName } from "../config/actions"

const updateName = (name, dispatch) => dispatch(updatePlanName(name))

const PlanEditForm = () => {
  const planName = useSelector((state) => state.plan.name)
  const formActionUrl = useSelector((state) => `/plans/${state.plan.id}`)
  const planActionIds = useSelector((state) => state.planActionIds)
  const planActionIdsJson = JSON.stringify(planActionIds)
  const dispatch = useDispatch()

  return (
    <div className="row">
      <div className="col plan-container">
        <form
          className="needs-validation"
          acceptCharset="UTF-8"
          method="post"
          action={formActionUrl}
        >
          <input name="utf8" type="hidden" value="✓" />
          <input type="hidden" name="_method" value="patch" />
          <input
            type="hidden"
            name="authenticity_token"
            defaultValue={authenticityToken()}
          />
          <input
            type="hidden"
            id="plan_benchmark_action_ids"
            name="plan[benchmark_action_ids]"
            autoComplete="off"
            defaultValue={planActionIdsJson}
          />

          <div className="row full-width stick-to-top bg-dark-blue">
            <div className="container mx-auto row no-gutters justify-content-between p-2">
              <div className="col-lg-5 m-2 form-group alt-header">
                <input
                  className="plan-name form-control"
                  required="required"
                  type="text"
                  value={planName}
                  name="plan[name]"
                  id="plan_name"
                  autoComplete="off"
                  onChange={(e) => updateName(e.target.value, dispatch)}
                />
                <div className="invalid-feedback">Cannot be empty</div>
              </div>

              <div className="col-auto m-2">
                <input
                  type="submit"
                  name="commit"
                  value="Save Plan"
                  data-disable-with="Save Plan"
                  className="plan-save btn btn-orange w-100"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col mt-4">
              <ActionCount />
            </div>
          </div>

          <div className="row">
            <div className="col mt-4">
              <ChartCard />
            </div>
          </div>

          <div className="row">
            <div className="col mt-4">
              <ActionList />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlanEditForm
