import React from "react"
import PropTypes from "prop-types"
import { map, get } from "lodash"
import { Card, CardBody, Col, Media, Row } from "reactstrap"
import img1 from "../../../assets/images/companies/img-1.png"
import TMSAvatar from "elements/TMS_Avatar"

const ProjectDetail = ({ project }) => {
  return (
    <Card>
      <CardBody>
        <Media>
          <TMSAvatar size={50} text={project.projectId.substring(0, 3)} />

          <Media className="overflow-hidden" body>
            <h5 className="text-truncate font-size-15">{project.projectId}</h5>
            <p className="text-muted">{project.projectDesc}</p>
          </Media>
        </Media>

        <h5 className="font-size-15 mt-4">Project Details :</h5>

        <p className="text-muted">
          {get(project, "projectDetails.description")}
        </p>

        <div className="text-muted mt-4">
          {project.projectDetails &&
            map(project.projectDetails.points, (point, index) => (
              <p key={index}>
                <i className="mdi mdi-chevron-right text-primary mr-1" />
                {point}
              </p>
            ))}
        </div>

        <Row className="task-dates">
          <Col sm="6" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar mr-1 text-primary" /> Start Date
              </h5>
              <p className="text-muted mb-0">{project.createdOn}</p>
            </div>
          </Col>

          <Col sm="6" xs="6">
            <div className="mt-4">
              <h5 className="font-size-14">
                <i className="bx bx-calendar-check mr-1 text-primary" /> Due
                Date
              </h5>
              <p className="text-muted mb-0">{project.projectEdd}</p>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

ProjectDetail.propTypes = {
  project: PropTypes.object,
}

export default ProjectDetail
