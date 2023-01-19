import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { connect, useDispatch, useSelector } from "react-redux"
import { isEmpty } from "lodash"
import { Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getProjectDetail } from "store/projects/actions"
import ProjectDetail from "./projectDetail"
import TeamMembers from "./teamMembers"
import OverviewChart from "./overviewChart"
import { options, series } from "common/data/projects"
import AttachedFiles from "./attachedFiles"
import Comments from "./comments"
import { getProjectById } from "store/actions"

const ProjectsOverview = props => {
  const {
    match: { params },
    onGetProjectDetail,
  } = props

  const dispatch = useDispatch()

  const projectDetail = useSelector(state => state.projects.projectDetail[0])

  console.log(projectDetail)

  useEffect(() => {
    console.log(params)
    if (params && params.id) {
      dispatch(getProjectById(params.id))
    }
  }, [params])

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Project Overview" />

          {!isEmpty(projectDetail) && (
            <>
              <Row>
                <Col lg="8">
                  <ProjectDetail project={projectDetail} />
                </Col>
              </Row>

              <Row>
                <Col lg="12">
                  <AttachedFiles files={projectDetail.FilesData} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

ProjectsOverview.propTypes = {
  projectDetail: PropTypes.any,
  match: PropTypes.object,
  onGetProjectDetail: PropTypes.func,
}

const mapStateToProps = ({ projects }) => ({
  projectDetail: projects.projectDetail,
})

const mapDispatchToProps = dispatch => ({
  onGetProjectDetail: id => dispatch(getProjectDetail(id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsOverview))
