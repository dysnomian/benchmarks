import React from "react"
import { useDispatch } from "react-redux"
import { clearFilterCriteria } from "../../config/actions"

const ClearFilters = () => {
  const dispatch = useDispatch()
  return (
    <div className="col-auto clear-filters-component">
      <a
        href="#"
        title="Clear any filters applied"
        onClick={(e) => {
          e.preventDefault()
          dispatch(clearFilterCriteria())
        }}
      >
        Clear Filters
      </a>
    </div>
  )
}

export default ClearFilters
