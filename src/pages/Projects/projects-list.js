import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, withRouter, Route } from "react-router-dom"
import { map, set } from "lodash"
import TMSAvatar from "../../elements/TMS_Avatar"
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//pagination
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"

//Import Image
import images from "assets/images"
import companies from "assets/images/companies"

//data
import {
  ftbtgetFilteredData,
  getProjects,
} from "store/actions"

//css
import "./projects-list.scss"

//Import data from json
import projectsC from "./projects-create"
import { Switch } from "react-router-dom/cjs/react-router-dom.min"
import { GET_PROJECTS_SUCCESS } from "store/projects/actionTypes"

const ProjectsList = props => {
  // const { projects, onGetProjects } = props
  // const projectList = useSelector(state => state.projects.projects)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getProjects())
  // }, [])

  //console.log(projectList)

  //services info button
  const [services, setServices] = useState([])
  const [openServices, setOpenServices] = useState(false)
  const toggleServices = () => setOpenServices(!openServices)

  const sendService = arr => {
    setServices(arr)
    toggleServices()
  }

  //more info button
  const [info, setInfo] = useState({})
  const [openMoreInfo, setOpenMoreInfo] = useState(false)
  const toggleInfo = () => setOpenMoreInfo(!openMoreInfo)

  const sendInfo = arr => {
    setInfo(arr)
    toggleInfo()
  }

  //backend data
  const ftbtprojects = useSelector(state => state.projects)
  const ftbtFilteredData = useSelector(state => state.filteredData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProjects())
  }, [])

  //pagination
  const { SearchBar, ClearSearchButton } = Search
  //console.log(ftbtprojects)
  //console.log(ftbtFilteredData)
  //console.log(ftbtprojects.filteredData)

  //table column
  const columns = [
    {
      dataField: "quotationId",
      text: "Project ID",
    },
    {
      dataField: "",
      text: "Project Name",
    },
    {
      dataField: "clientName",
      text: "Client Name",
    },

    {
      dataField: "projectType",
      text: "Project Type",
    },
    {
      dataField: "servicesData.length",
      text: "Files / Total",
    },
    {
      dataField: "analysisCreatedOn",
      text: "Created On",
      formatter: (cell, row) => {
        return row.analysisCreatedOn
          ? row.analysisCreatedOn.substring(0, 10)
          : null
      },
    },
    {
      dataField: "quotationStatus",
      text: "Status",
    },
    {
      dataField: "actions",
      text: "Action",
      formatter: (cellContent, row) => {
        return (
          <React.Fragment>
            <div className="d-flex">
              <Button
                title="More Info"
                onClick={() =>
                  sendInfo({
                    clientDomain: row.clientDomain,
                    createdName: row.createdName,
                    currency: row.currency,
                    fileDomain: row.fileDomain,
                    workingDays: row.workingDays,
                    inrValue: row.inrValue,
                  })
                }
                className="mx-2"
              >
                <i className="bx bx-info-circle"></i>
              </Button>

              <Button
                title="Services Info"
                onClick={() => sendService(row.servicesData)}
                className="mx-2"
              >
                <i className="bx bxs-info-circle"></i>
              </Button>

              <Button title="Download" className="mx-2">
                <i className="bx bxs-download"></i>
              </Button>

              <Link
                to={{
                  pathname: `/file-details/${row.quotationId}`,
                }}
              >
                <Button title="File Details" className="mx-2">
                  <i className="bx bx-help-circle"></i>
                </Button>
              </Link>
            </div>
          </React.Fragment>
        )
      },
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />
          <Modal isOpen={openMoreInfo} className="customModal" size="lg">
            <ModalBody>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <th>Client Domain :</th>
                    <td>{info.clientDomain}</td>
                  </tr>
                  <tr>
                    <th>Created By :</th>
                    <td>{info.createdName}</td>
                  </tr>
                  <tr>
                    <th>Currency :</th>
                    <td>{info.currency}</td>
                  </tr>
                  <tr>
                    <th>File Domain :</th>
                    <td>{info.fileDomain}</td>
                  </tr>
                  <tr>
                    <th>Working Days :</th>
                    <td>{info.workingDays}</td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="primary" onClick={toggleInfo}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={openServices} size="lg" scrollable>
            <ModalBody>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Service Type</th>
                    <th>Quantity</th>
                    <th>UOM</th>
                    <th>Rate</th>
                    <th>Source Language</th>
                    <th>Target Language</th>
                  </tr>
                </thead>
                {services.map(ele => (
                  <tbody key={ele._id}>
                    <tr>
                      <td>{ele.fileName}</td>
                      <td>{ele.serviceType}</td>
                      <td>{ele.quantity}</td>
                      <td>{ele.uom}</td>
                      <td>{ele.rate}</td>
                      <td>{ele.sourceLanguage}</td>
                      <td>{ele.targetLanguage}</td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button type="button" color="primary" onClick={toggleServices}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <PaginationProvider pagination={paginationFactory()}>
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="_id"
                        data={
                          ftbtprojects.filteredData &&
                          ftbtprojects.filteredData.length >= 1
                            ? ftbtprojects.filteredData
                            : ftbtprojects.projects
                        }
                        columns={columns}
                        search
                      >
                        {props => (
                          <div>
                            {/* <div className="d-flex align-items-center justify-content-center">
                              <h5>Search:</h5>
                              <SearchBar {...props.searchProps} />
                              <ClearSearchButton {...props.searchProps} />
                            </div> */}
                            <BootstrapTable
                              responsive
                              {...props.baseProps}
                              {...paginationTableProps}
                            />
                          </div>
                        )}
                      </ToolkitProvider>
                    )}
                  </PaginationProvider>
                </div>
              </div>
            </Col>
          </Row>

          {/* <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle mr-2" />
                  Load more
                </Link>
              </div>
            </Col>
          </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

ProjectsList.propTypes = {
  projects: PropTypes.array,
  onGetProjects: PropTypes.func,
}

const mapStateToProps = ({ projects }) => ({
  projects: projects.projects,
})

const mapDispatchToProps = dispatch => ({
  onGetProjects: () => dispatch(getProjects()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsList))
