import React from "react"
import { useSelector } from "react-redux"
import NudgeByTechnicalAreaOneYear from "./NudgeByTechnicalAreaOneYear"
import NudgeByTechnicalAreaFiveYear from "./NudgeByTechnicalAreaFiveYear"

const NudgeByTechnicalArea = () => {
  let whichNudgeComponent
  const plan = useSelector((state) => state.plan)
  if (plan.term === 500) {
    whichNudgeComponent = <NudgeByTechnicalAreaFiveYear />
  } else {
    whichNudgeComponent = <NudgeByTechnicalAreaOneYear />
  }
  return (
    <div className="col nudge-container">
      <div className="card">
        <p>
          <svg className="lightbulb" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.57877 15.4626V16.4098C8.57877 16.7633 8.35903 17.0639 8.05245 17.1754V17.4924C8.05245 17.9409 7.699 18.3044 7.26298 18.3044H4.6314C4.19538 18.3044 3.84193 17.9409 3.84193 17.4924V17.1754C3.53535 17.0639 3.31561 16.7633 3.31561 16.4098V15.4626C3.31561 15.2384 3.49235 15.0566 3.71035 15.0566H8.18403C8.40202 15.0566 8.57877 15.2384 8.57877 15.4626ZM3.8713 13.974C3.54541 13.974 3.25202 13.7683 3.13525 13.4554C1.85827 10.034 0.157715 10.3787 0.157715 6.93701C0.157715 3.64869 2.74998 0.982666 5.94719 0.982666C9.14439 0.982666 11.7367 3.64869 11.7367 6.93701C11.7367 10.3787 10.0361 10.034 8.75916 13.4554C8.64239 13.7683 8.34896 13.974 8.02311 13.974H3.8713ZM3.31561 6.93701C3.31561 5.44464 4.49614 4.23049 5.94719 4.23049C6.23788 4.23049 6.4735 3.98812 6.4735 3.68919C6.4735 3.39025 6.23788 3.14788 5.94719 3.14788C3.91571 3.14788 2.26298 4.84768 2.26298 6.93701C2.26298 7.23595 2.49864 7.47832 2.78929 7.47832C3.07995 7.47832 3.31561 7.23595 3.31561 6.93701Z" />
          </svg>
          Tips for your draft plan
        </p>
        {whichNudgeComponent}
      </div>
    </div>
  )
}

export default NudgeByTechnicalArea
