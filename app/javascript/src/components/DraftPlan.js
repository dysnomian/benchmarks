import React from "react"
import PropTypes from "prop-types"

class DraftPlan extends React.Component {
  render() {
    return <>Greeting: {this.props.greeting}</>
  }
}

DraftPlan.propTypes = {
  greeting: PropTypes.string,
}

export default DraftPlan
