import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Dropzone from "react-dropzone"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap"
import FileUpload from "components/Common/FileUpload"
import { useDispatch, useSelector } from "react-redux"
//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { element } from "prop-types"
import Select from "react-select"

import { compact } from "lodash"
import docImage from "assets/images/icons/docx.png"
import { BaseURL } from "config/api"
import * as addproductAction from "store/actions"
import { sendSnackAlert } from "store/actions"
import * as commonAction from "store/actions"
import * as projectAction from "store/actions"
const ProjectsCreate = props => {
  const dispatch = useDispatch()
  const [dueDate, setdueDate] = useState(new Date())
  const [selectedFiles, setselectedFiles] = useState([])
  const [selectedImages, setselectedImages] = useState([])
  const [selectedDatasheet, setselectedDatasheet] = useState([])

  const projectCreated = useSelector(state => state.projects.projectStatus)
  const [onChangeValues, setonChangeValues] = useState({
    languages_source: [
      { label: "English", value: "english" },
      { label: "Telugu", value: "telugu" },
      { label: "Hindi", value: "hindi" },
      { label: "Marati", value: "marati" },
      { label: "Kannada", value: "kannada" },
      { label: "Tamil", value: "tamil" },
      { abel: "Gujarati", value: "gujarati" },
    ],
    languages_target: [
      { label: "English", value: "english" },
      { label: "Telugu", value: "telugu" },
      { label: "Hindi", value: "hindi" },
      { label: "Marati", value: "marati" },
      { label: "Kannada", value: "kannada" },
      { label: "Tamil", value: "tamil" },
      { abel: "Gujarati", value: "gujarati" },
    ],
    projectDomain: [
      { label: "Healthcare", value: "healthcare" },
      { label: "IT/ITES", value: "it/ites" },
    ],

    projectTypeValue: [
      { label: "Translation", value: "translation" },
      { label: "Transliteration", value: "transliteration" },
    ],
    clientName: "",
    contactName: "",
    projectType: "",
    projectName: "",
    projectDesc: "",
    selProjectDomain: {},
    selSourceLangauge: {},
    selTargetLanguage: [],
    selProjectType: "",
    images: [],
    dropDownValues: { projectDomain: [] },
    tmChecked: false,
    glossaryChecked: false,
  })

  const handleonChangeValues = key => event => {
    console.log([key])

    if (key.includes("sel")) {
      console.log([key])
      console.log(event)
      setonChangeValues(prevState => ({
        ...prevState,
        [key]: event,
      }))
      console.log(onChangeValues)
    } else {
      console.log([key])
      console.log(event.target.checked)
      setonChangeValues(prevState => ({
        ...prevState,
        [key]: event.target.value,
      }))
    }
    if (key.includes("Checked")) {
      console.log("here")
      setonChangeValues(prevState => ({
        ...prevState,
        [key]: event.target.checked,
      }))
    }

    // if(key.includes("glossaryChecked"))
    //   setonChangeValues(prevState => ({
    //   ...prevState,
    //   [key]:event.target.checked
    //  }))
  }

  const removeSelectedImages = file => {
    console.log("data>removeSelectedImages", file)
    const files = selectedImages
    const newFiles = files.filter(item => {
      return item.id !== file.id
    })
    setonChangeValues({
      ...onChangeValues,
      images: newFiles,
    })

    setselectedImages(newFiles)
  }

  useEffect(() => {
    console.log(projectCreated)
    if (projectCreated.message) {
      window.location.reload()
    }
  }, [projectCreated])
  const handleAcceptedImages = (images, res) => {
    res.data.map((image, index) => {
      var imageUrl = BaseURL + "?url=" + encodeURIComponent(image.file_url)
      Object.assign(image, {
        id: index,
        preview: docImage,
        formattedSize: formatBytes(image.file_size),
        name: image.file_name,
      })
    })

    setonChangeValues({
      ...onChangeValues,
      images: res.data,
    })

    setselectedImages(res.data)
  }
  const uploadImages = images => {
    console.log(onChangeValues.projectName)
    if (onChangeValues.projectName === "") {
      dispatch(
        commonAction.sendSnackAlert("error", "Please fill the Project Name")
      )
    } else {
      console.log(onChangeValues)
      dispatch(
        addproductAction.commonMediaUpload(
          images,
          {
            proId: onChangeValues.projectName,
            proName: onChangeValues.projectName,
          },
          handleAcceptedImages
        )
      )
    }
  }
  const handleFormSubmit = e => {
    e.preventDefault()
    console.log(onChangeValues)
    if (onChangeValues) {
      let filedata = []

      let projectData = {
        project: {
          pid: onChangeValues.projectName,
          projectName: onChangeValues.projectName,
          clientName: onChangeValues.clientName,
          projectDescription: onChangeValues.projectDesc,
          projectDomain: onChangeValues.selProjectDomain.value,
          contactName: onChangeValues.contactName,
          fileId: "232",
          projectType: onChangeValues.selProjectType.value,
          projectEdd: dueDate,
          approxProjectValue: 20000,
        },
        filesData: onChangeValues.images.map((file, index) => {
          return {
            fileName: file.file_name,
            filePath: file.file_url,
            sourceLanguage: onChangeValues.selSourceLangauge.value,
            targetLanguage: onChangeValues.selTargetLanguage[index].value,
          }
        }),
      }
      dispatch(projectAction.createProject(projectData))
    }
    // setonChangeValues({
    //   clientName: "",
    //   contactName: "",
    //   projectType: "",
    //   projectName: "",
    //   projectDesc: "",
    //   selProjectDomain: {},
    //   selSourceLangauge: {},
    //   selTargetLanguage: [],
    //   selProjectType: "",
    //   images: [],
    //   dropDownValues: { projectDomain: [] },
    //   tmChecked: false,
    //   glossaryChecked: false,
    // })
  }

  const dueDateChange = date => {
    setdueDate(date)
  }

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )

    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Projects" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New Project</CardTitle>
                  <Form onSubmit={handleFormSubmit}>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="clientname"
                        className="col-form-label col-lg-2"
                      >
                        Client Name
                      </Label>
                      <Col lg="10">
                        <Input
                          required
                          id="clientname"
                          name="clientname"
                          type="text"
                          className="form-control"
                          value={onChangeValues.clientName.value}
                          placeholder="Enter client Name..."
                          onChange={handleonChangeValues("clientName")}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="contactname"
                        className="col-form-label col-lg-2"
                      >
                        Contact Name
                      </Label>
                      <Col lg="10">
                        <Input
                          required
                          id="contactname"
                          name="contactname"
                          type="text"
                          value={onChangeValues.contactName.value}
                          className="form-control"
                          placeholder="Enter contact Name..."
                          onChange={handleonChangeValues("contactName")}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projecttype"
                        className="col-form-label col-lg-2"
                      >
                        Project Type
                      </Label>
                      <Col lg="10">
                        <Select
                          options={onChangeValues.projectTypeValue}
                          onChange={handleonChangeValues("selProjectType")}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        Project Name
                      </Label>
                      <Col lg="10">
                        <Row>
                          <Col md={3} className="">
                            <Input
                              required
                              id="pid"
                              name="pid"
                              type="text"
                              className="form-control"
                              disabled
                            />
                          </Col>
                          <Col md={9} className="">
                            <Input
                              required
                              id="projectname"
                              name="projectname"
                              type="text"
                              value={onChangeValues.projectName.value}
                              className="form-control"
                              placeholder="Enter Project Name..."
                              onChange={handleonChangeValues("projectName")}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <Label
                        htmlFor="projectdesc"
                        className="col-form-label col-lg-2"
                      >
                        Project Description
                      </Label>
                      <Col lg="10">
                        <textarea
                          className="form-control"
                          required
                          id="projectdesc"
                          value={onChangeValues.projectDesc.value}
                          rows="3"
                          placeholder="Enter Project Description..."
                          onChange={handleonChangeValues("projectDesc")}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Project EDD
                      </Label>
                      <Col lg="10">
                        <DatePicker
                          placeholderText="dd-mm-yy"
                          className="form-control"
                          selected={dueDate}
                          onChange={dueDateChange}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="projectdomain"
                        className="col-form-label col-lg-2"
                      >
                        Project Domain
                      </label>
                      <Col lg="10">
                        <Select
                          options={onChangeValues.projectDomain}
                          onChange={handleonChangeValues("selProjectDomain")}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="sourcelanguage"
                        className="col-form-label col-lg-2"
                      >
                        Source Language
                      </label>
                      <Col lg="10">
                        <Select
                          options={onChangeValues.languages_source}
                          onChange={handleonChangeValues("selSourceLangauge")}
                        ></Select>
                      </Col>
                    </FormGroup>
                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="targetlanguage"
                        className="col-form-label col-lg-2"
                      >
                        Target Language
                      </label>
                      <Col lg="10">
                        <Select
                          options={onChangeValues.languages_target}
                          required
                          onChange={handleonChangeValues("selTargetLanguage")}
                          isMulti
                        ></Select>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Project Files
                      </Label>
                      <Col lg="10">
                        <FileUpload
                          selectedFiles={selectedImages}
                          fileType={[".doc", ".docx"]}
                          uploadFiles={images => uploadImages(images)}
                          removeSelectedFiles={file =>
                            removeSelectedImages(file)
                          }
                          multiple={true}
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label className="col-form-label col-lg-2">
                        Translation Management
                      </Label>
                      <Row>
                        <Col md="4">
                          <Label
                            htmlFor="defaultcheck1"
                            className="col-form-label"
                          >
                            TM
                          </Label>
                        </Col>
                        <Col md="2">
                          <div
                            className="custom-control custom-checkbox mb-3"
                            dir="ltr"
                            style={{ marginTop: 10 }}
                          >
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitchtm"
                              value={onChangeValues.tmChecked}
                              name="tm"
                              onChange={handleonChangeValues("tmChecked")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitchtm"
                            ></label>
                          </div>
                        </Col>
                        <Col md="4">
                          <Label
                            htmlFor="defaultcheck1"
                            className="col-form-label"
                          >
                            Glossary
                          </Label>
                        </Col>
                        <Col md="2">
                          <div
                            className="custom-control custom-checkbox mb-3"
                            dir="ltr"
                            style={{ marginTop: 10 }}
                          >
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitchsizeglossary"
                              name="glossary"
                              value={onChangeValues.glossaryChecked}
                              onChange={handleonChangeValues("glossaryChecked")}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitchsizeglossary"
                            ></label>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                    <Row>
                      {onChangeValues.tmChecked ? (
                        <Row>
                          <FormGroup className="mb-4" row>
                            <Label className="col-form-label col-lg-2">
                              TM Files
                            </Label>
                            <Col lg="10">
                              <Dropzone
                                onDrop={acceptedFiles => {
                                  handleAcceptedFiles(acceptedFiles)
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div className="dropzone">
                                    <div
                                      className="dz-message needsclick"
                                      {...getRootProps()}
                                    >
                                      <input {...getInputProps()} />
                                      <div className="dz-message needsclick">
                                        <div className="mb-3">
                                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                                        </div>
                                        <h4>
                                          Drop files here or click to upload.
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>
                              <div
                                className="dropzone-previews mt-3"
                                id="file-previews"
                                required
                              >
                                {selectedFiles.map((f, i) => {
                                  return (
                                    <Card
                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                      key={i + "-file"}
                                    >
                                      <div className="p-2">
                                        <Row className="align-items-center">
                                          <Col className="col-auto">
                                            <img
                                              data-dz-thumbnail=""
                                              height="80"
                                              className="avatar-sm rounded bg-light"
                                              alt={f.name}
                                              src={f.preview}
                                            />
                                          </Col>
                                          <Col>
                                            <Link
                                              to="#"
                                              className="text-muted font-weight-bold"
                                            >
                                              {f.name}
                                            </Link>
                                            <p className="mb-0">
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </div>
                            </Col>
                          </FormGroup>
                        </Row>
                      ) : null}

                      {onChangeValues.glossaryChecked ? (
                        <Row>
                          <FormGroup className="mb-4" row>
                            <Label className="col-form-label col-lg-2">
                              Glossary Files
                            </Label>
                            <Col lg="10">
                              <Dropzone
                                onDrop={acceptedFiles => {
                                  handleAcceptedFiles(acceptedFiles)
                                }}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div className="dropzone">
                                    <div
                                      className="dz-message needsclick"
                                      {...getRootProps()}
                                    >
                                      <input {...getInputProps()} />
                                      <div className="dz-message needsclick">
                                        <div className="mb-3">
                                          <i className="display-4 text-muted bx bxs-cloud-upload" />
                                        </div>
                                        <h4>
                                          Drop files here or click to upload.
                                        </h4>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>
                              <div
                                className="dropzone-previews mt-3"
                                id="file-previews"
                              >
                                {selectedFiles.map((f, i) => {
                                  return (
                                    <Card
                                      className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                      key={i + "-file"}
                                    >
                                      <div className="p-2">
                                        <Row className="align-items-center">
                                          <Col className="col-auto">
                                            <img
                                              data-dz-thumbnail=""
                                              height="80"
                                              className="avatar-sm rounded bg-light"
                                              alt={f.name}
                                              src={f.preview}
                                            />
                                          </Col>
                                          <Col>
                                            <Link
                                              to="#"
                                              className="text-muted font-weight-bold"
                                            >
                                              {f.name}
                                            </Link>
                                            <p className="mb-0">
                                              <strong>{f.formattedSize}</strong>
                                            </p>
                                          </Col>
                                        </Row>
                                      </div>
                                    </Card>
                                  )
                                })}
                              </div>
                            </Col>
                          </FormGroup>
                        </Row>
                      ) : null}
                    </Row>

                    <Row className="justify-content-end">
                      <Col lg="10">
                        <Button type="submit" color="primary">
                          Create Project
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ProjectsCreate
