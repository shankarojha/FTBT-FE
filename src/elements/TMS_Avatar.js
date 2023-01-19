import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const TMSAvatar = props => {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
        borderRadius: props.size,
        backgroundColor: "orange",
        marginRight: 20,
      }}
    >
      <h4
        style={{
          color: "White",
          justifyContent: "center",
          verticalAlign: "center",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        {props.text}
      </h4>
    </div>
  )
}

TMSAvatar.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
}

export default TMSAvatar
