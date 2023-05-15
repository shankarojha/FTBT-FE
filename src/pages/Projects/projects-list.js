import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import TMSAvatar from "../../elements/TMS_Avatar"
import {
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
  Button
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import Image
import images from "assets/images"
import companies from "assets/images/companies"

import { getProjects } from "store/actions"

const ProjectsList = props => {
  //const { projects, onGetProjects } = props
  //const projectList = useSelector(state => state.projects.projects)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getProjects())
  // }, [])

  //console.log(projectList)

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap table-centered table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "100px" }}>
                          #
                        </th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Project Type</th>
                        {/* <th scope="col">Word Count</th>
                        <th scope="col">Price</th> */}
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td><Link to="file-details/VPKW00718_1920_001" className="dropdown-item">
                            <Button>File Details</Button>
                          </Link></td></tr>
                      {/* {map(projectList, (project, index) => (
                        <tr key={index}>
                          <td>
                            <TMSAvatar
                              size={50}
                              text={project.projectId.substring(0, 2)}
                            />
                          </td>
                          <td width={80}>
                            <h5 className="text-truncate font-size-14">
                              <Link
                                to={`/projects-overview/${project.projectId}`}
                                className="text-dark"
                              >
                                {project.projectId}
                              </Link>
                            </h5>
                            <p className="text-muted mb-0">
                              {project.projectDesc}
                            </p>
                          </td>
                          <td width={80}>{project.clientName}</td>
                          <td width={80}>{project.projectType}</td>
                          <td width={80}>{project.projectStatus}</td>
                          <td width={200}></td>
                        </tr>
                      ))} */}
                    </tbody>
                  </Table>
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



// /**Dilip */

// import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
// import { connect, useDispatch, useSelector } from "react-redux"
// import { Link, withRouter } from "react-router-dom"
// import {
//   Modal,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Badge,
//   Col,
//   Container,
//   DropdownItem,
//   DropdownMenu,
//   DropdownToggle,
//   Row,
//   Table,
//   UncontrolledDropdown,
//   UncontrolledTooltip,
// } from "reactstrap"

// //Import Breadcrumb
// import Breadcrumbs from "components/Common/Breadcrumb"

// //Import Image
// import images from "assets/images"
// import companies from "assets/images/companies"

// import { getProjects } from "store/actions"

// //Import data from json
// import {result} from "C:/Users/shank/Downloads/output"

// const ProjectsList = props => {
//   // const { projects, onGetProjects } = props
//   // const projectList = useSelector(state => state.projects.projects)
//   const dispatch = useDispatch()
//   // useEffect(() => {
//   //   dispatch(getProjects())
//   // }, [])

//   // console.log(projectList)

//   const [services, setServices] = useState([])
//   const [openServices, setServicesInfo] = useState(false)
//   const toggleServices = () => setServicesInfo(!openServices)

//   const sendService = arr => {
//     setServices(arr)
//     console.log(arr)
//     toggleServices()
//   }

//   const [Info, SetMoreInfo] = useState({})
//   const [openMoreInfo, setInfo] = useState(false)
//   const toggleInfo = () => setInfo(!openMoreInfo)

//   const sendInfo = (a,b) => {
//     SetMoreInfo({analysisCreatedBy:b,fileDomain:a })
//     //console.log(arr)
//     toggleInfo()
//   }

//   const convertISOStringToMonthDay = date => {
//     const tempDate = new Date(date).toString().split(' ');
//     const formattedDate = `${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`;
//     return formattedDate;
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Render Breadcrumbs */}
//           <Breadcrumbs title="Projects" breadcrumbItem="Projects List" />

//           <Row>
//             <Col lg="12">
//               <div className="">
//                 <div className="table-responsive">
//                   <Table className="project-list-table table-nowrap table-centered table-borderless">
//                     <thead>
//                       <tr>
//                         <th scope="col" style={{ width: "100px" }}>
//                           #
//                         </th>
//                         <th scope="col">Project Name</th>
//                         <th scope="col">Client Name</th>
//                         <th scope="col">Project Type</th>
//                         {/* <th scope="col">Word Count</th>
//                         <th scope="col">Price</th> */}
//                         <th scope="col">Files/Total</th>
//                         <th scope="col">Created On</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {result.map((data, index) => {
//                         return (
//                           <tr key={data._id}>
//                             <td>{index + 1}</td>
//                             <td></td>
//                             <td>{data.clientName}</td>
//                             <td>{data.projectType}</td>
//                             <td>{data.servicesData.length}</td>
//                             <td>{convertISOStringToMonthDay(data.analysisCreatedOn)}</td>
//                             <td>{data.quotationStatus}</td>
//                             <td>
//                               <Button
//                                 title="More Info"
//                                 onClick={() => sendInfo(data.fileDomain,data.analysisCreatedBy)}
//                                 className="mx-2"
//                               >
//                                 <i className="bx bx-info-circle"></i>
//                               </Button>
//                               <Modal isOpen={openMoreInfo}>
//                                 <ModalBody>
//                                   {openMoreInfo && 
//                                     <div>
//                                       <p>{Info.analysisCreatedBy}</p>
//                                       <p>{Info.fileDomain}</p>
//                                     </div>
//                                   }
//                                 </ModalBody>
//                                 <ModalFooter>
//                                   <Button
//                                     type="button"
//                                     color="primary"
//                                     onClick={toggleInfo}
//                                   >
//                                     Close
//                                   </Button>
//                                 </ModalFooter>
//                               </Modal>{" "}
//                               <Button
//                                 title="Services Info"
//                                 onClick={() => sendService(data.servicesData)}
//                                 className="mx-2"
//                               >
//                                 <i className="bx bxs-info-circle"></i>
//                               </Button>
//                               <Modal isOpen={openServices}>
//                                 <ModalBody>
//                                   {openServices && (
//                                     services.map(ele => (
//                                     <Table key={ele._id}>
//                                       <tbody>
//                                       <tr>
//                                         <td>{ele.fileName}</td>
//                                         <td>{ele.serviceType}</td>
//                                       </tr>
//                                       </tbody>
//                                     </Table>
//                                     ))
                                    
//                                   )}
//                                 </ModalBody>
//                                 <ModalFooter>
//                                   <Button
//                                     type="button"
//                                     color="primary"
//                                     onClick={toggleServices}
//                                   >
//                                     Close
//                                   </Button>
//                                 </ModalFooter>
//                               </Modal>
//                               <Link to={`file-details/${data.quotationId}`}>
//                          <Button title="Download" className="mx-2">
//                                 <i className="bx bxs-download"></i>
//                               </Button>
//                            </Link>
//                             </td>
//                           </tr>
//                         )
//                       })}
//                     </tbody>
//                   </Table>
//                 </div>
//               </div>
//             </Col>
//           </Row>

//           {/* <Row>
//             <Col xs="12">
//               <div className="text-center my-3">
//                 <Link to="#" className="text-success">
//                   <i className="bx bx-loader bx-spin font-size-18 align-middle mr-2" />
//                   Load more
//                 </Link>
//               </div>
//             </Col>
//           </Row> */}
//         </Container>
//       </div>
//     </React.Fragment>
//   )
// }

// ProjectsList.propTypes = {
//   projects: PropTypes.array,
//   onGetProjects: PropTypes.func,
// }

// const mapStateToProps = ({ projects }) => ({
//   projects: projects.projects,
// })

// const mapDispatchToProps = dispatch => ({
//   onGetProjects: () => dispatch(getProjects()),
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(ProjectsList))
