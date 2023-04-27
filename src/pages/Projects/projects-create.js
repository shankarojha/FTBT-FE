import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './projects-create.scss'
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
  CardHeader,
  CardText,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  Table 
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
import { API } from "config/api"
import { axiosPost, axiosGet } from "services/apiServices"
import { uniq } from "lodash"


const ProjectsCreate = props => {
  const dispatch = useDispatch()
  const [dueDate, setdueDate] = useState(new Date())
  const [selectedFiles, setselectedFiles] = useState([])
  const [selectedImages, setselectedImages] = useState([])
  const [selectedDatasheet, setselectedDatasheet] = useState([])
  const [languageList, setLanguageList] = useState([])
  const [serviceList, setServiceList] = useState([])
  const [serviceFiles, setServiceFiles]= useState([])
  const [serviceKey,setServiceKey]= useState(0)
  const [fileName,setFileName]= useState("")
  const [isUploading,setIsUploading] = useState(false)

  const projectCreated = useSelector(state => state.projects.projectStatus)
  const [onChangeValues, setonChangeValues] = useState({
    projectName: "",
    selSourceLangauge: {},
    selTargetLanguage: {},
    images: [],
    dropDownValues: { projectDomain: [] },
    tmChecked: false,
    glossaryChecked: false,
    selService:{},
    selFileName:"",
    selOrgFile:""
  })


  const [openModal, setOpenModal] = useState(false);
  const [focusAfterClose, setFocusAfterClose] = useState(true);

  const toggleModal = () => setOpenModal(!openModal);
  const handleSelectChange = ({ target: { value } }) => {
    setFocusAfterClose(JSON.parse(value));
  };

  const handleonChangeValues = key => event => {
    console.log("key",[key])

    if (key.includes("sel")) {
      console.log("event:",event)
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
  }

  const removeFromService = (data) =>{
    console.log("data:", data)
    
    setServiceFiles(prevState=> prevState.filter(item=>item.serviceKey!==data.serviceKey))
  }

  const addServiceFile = () =>{
    let serviceObj = {
      serviceKey:serviceKey,
      targetLanguage:onChangeValues.selTargetLanguage.value,
      sourceLanguage:onChangeValues.selSourceLangauge.value,
      serviceType:onChangeValues.selService.value,
      filename:onChangeValues.selOrgFile,
      orgFilename:onChangeValues.selFileName
    }

    setServiceFiles(prevState=>[...prevState, serviceObj])
    setServiceKey(prevState=>prevState+1)
    
  }

  /**Testing */

  useEffect(()=>{
    console.log(serviceFiles)
  },[serviceFiles,removeFromService])

  /**Ends */

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

  useEffect(()=>{
    getLanguages()
    getServices()
  },[])

  const getServices = async()=>{
    try{
      const response = await axiosGet(API.SERVICES_FETCH)
      const services = await response.data.map(el=>{
        return el.servicesName
      })
      let uniqueServices = await uniq(services)
      
      uniqueServices = await uniqueServices.map(el=>{
        return {value:el, label:el}
      })
      setServiceList(uniqueServices)
    }catch(error){
      console.log(error)
    }
  }

  const getLanguages= async()=>{
    try{
      const response = await axiosGet(API.LANGUAGES_FETCH)
      const languages = await response.data.map((el)=>{
        return {value:el.languageName,label:el.languageName}
      })
      await setLanguageList(languages)
      console.log(languageList)
    }catch(error){
      console.log(error)
    }finally{
      console.log("here")
      console.log(languageList)
    }
  }

  const handleAcceptedImages = (images, res) => {
    console.log("res handle:", res)      

      setFileName(res.data.filename)
    

    setonChangeValues({
      ...onChangeValues,
      selOrgFile: res.data.filename,
      selFileName:res.data.originalname
    })

    if(res){
      setIsUploading(false)
      dispatch(
        commonAction.sendSnackAlert("success", "Upload Complete")
      )
    }

    setselectedImages(res.data)
  }
  const uploadImages = images => {
    //console.log("iamges",images)
    //console.log(onChangeValues.projectName)
    if (onChangeValues.projectName === "") {
      dispatch(
        commonAction.sendSnackAlert("error", "Please fill the Project Name")
      )
    } else {
      setIsUploading(true)
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
                        htmlFor="projectname"
                        className="col-form-label col-lg-2"
                      >
                        Project Name
                      </Label>
                      <Col lg="10">
                        <Row>
                          <Col md={12} className="">
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

                    {/* Here 1*/}

                    {serviceFiles.length>0 && <Table className="text-center">
                    <thead>
                      <tr>
                        <th>File Name</th>
                        <th>Source Language</th>
                        <th>Target Language</th>
                        <th>Service</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody className="serviceTable">
                      {serviceFiles.map((el)=>(<tr key={el.serviceKey}>
                        <td>{el.orgFilename}</td>
                        <td>{el.sourceLanguage}</td>
                        <td>{el.targetLanguage}</td>
                        <td>{el.serviceType}</td>
                        <td><Button type="button" color="danger" onClick={()=>removeFromService(el)}><i className="bx bxs-trash"></i> </Button></td>
                      </tr>))}
                    </tbody>
                    </Table>}

                      <Card>
                        <CardHeader>
                          Add files
                        </CardHeader>
                        <CardBody>
                        <FormGroup className="mb-4" row>
                      <label
                        htmlFor="fileName"
                        className="col-form-label col-lg-2"
                      >
                        File Name
                      </label>
                      <Col lg="10">
                        <Input type="text"
                          onChange={handleonChangeValues("fileName")}
                        ></Input>
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
                          options={languageList}
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
                          options={languageList}
                          required
                          onChange={handleonChangeValues("selTargetLanguage")}
                          
                        ></Select>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="targetService"
                        className="col-form-label col-lg-2"
                      >
                        Service
                      </label>
                      <Col lg="10">
                        <Select
                          options={serviceList}
                          required
                          onChange={handleonChangeValues("selService")}
                          
                        ></Select>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Project Files
                      </Label>
                      <Button type ="button" color="primary" onClick={toggleModal}>
                        Upload File
                      </Button>
                      <Modal returnFocusAfterClose={focusAfterClose} isOpen={openModal}>
                        <ModalBody>
                        {!isUploading && openModal && <FileUpload
                          onChange={console.log("Called On Change")}
                          selectedFiles={selectedImages}
                          //fileType={[".doc", ".docx"]}
                          uploadFiles={images => uploadImages(images)}
                          removeSelectedFiles={file =>
                            removeSelectedImages(file)
                          }
                          multiple={true}
                          required
                        />}
                        {isUploading && <div className="text-center m-4 d-flex justify-content-center align-items-center">
                        <div className="loader"></div>
                        </div>}
                        </ModalBody>
                        {<ModalFooter>
                          <Button type ="button" color="primary" onClick={toggleModal}>
                            Close
                          </Button>
                        </ModalFooter>}
                        
                      </Modal>
                      <Col lg="10">
                        
                      </Col>
                    </FormGroup>
                        </CardBody>
                        <CardFooter >
                          <Button type="button" color="primary" onClick={addServiceFile}>Add</Button>
                        </CardFooter>
                      </Card>
                    

                    {/*Till here*/}
                    <Row className="text-center">
                      <Col lg="12">
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
