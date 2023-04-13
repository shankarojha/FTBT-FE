import React, { useState, useEffect } from "react"
import { Container, Row, Col, Table, Button } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
// import { Editor, EditorState } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "./SplitScreen.scss"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as XLSX from 'xlsx'



const SplitScreen = props => {
  const [editorState, setEditorState] = useState()
  const [splitEditorState, setSplitEditorState] = useState()

  const onCheck = () => {
    console.log(editorState.getCurrentContent().getPlainText("\u0001"))
  }

  const[jsonData, setJsonData] = useState([])
  const readExcelFile=async (e)=>{
    console.log("e: ", e)
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    setJsonData( XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: "",
    }));


    //console.log(e.target.files[0]);
    //console.log(workbook);
    console.log("jsonData : ", jsonData);
  }

  
  const [editorData, setEditorData] = useState();
  let initEditorData=""

  useEffect(()=>{
    initEditorData = `<table striped responsive style="border-collapse: collapse;"><tbody>`
    jsonData.forEach((item, index, arr)=>{
      //console.log(initEditorData+`<tr ><th scope='row'>${item[0]}</th><td width="40%"><p >${item[1]}</p></td><th scope="row">2</th><td><p></p></td></tr>` )
      initEditorData=initEditorData+`<tr ><td style="pointer-events: none;">${item[1]}</td><td><p></p></td></tr>` 
    })
    initEditorData+=`</tbody></table>`
    console.log("initEditorData :",initEditorData)
    setEditorData(initEditorData)
  },[jsonData])

  

//   useEffect(() => {
//     const editor = ClassicEditor.instances.editor;
//     editor.editable().setReadOnly(true);

//     const table = editor.editable().find('table')[0];
//     table.setAttribute('contenteditable', false);
//   }, []);

//   const editorData = `<Table striped responsive><tbody><tr contenteditable="false"><th scope='row'>1</th><td contenteditable="false"><p contenteditable="false">dummy text</p></td><th scope="row">2</th>
//   <td>
//     <input type="text" className="splitText"></input>
//   </td></tr><tr><th scope='row'>2</th><td>Mark</td><th scope="row">2</th>
//   <td>
//     <input type="text" className="splitText"></input>
//   </td></tr></tbody></Table>`

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Projects"
            breadcrumbItem="Splitscreen"
          ></Breadcrumbs>
          <Row>
          <Col sm-12>
                <Button>
                    <input type="file" onChange={(e)=>{
                        readExcelFile(e)
                    }}></input>
                    <i style={{ color: "#ffff" }} className="bx bx-upload h3 m-0" />
                </Button></Col>
          </Row>
          <Row>
            
            {/* <Col sm-6 className="editorWrapper text-center">
              <h1>Screen 1</h1>
              <div>
                <Editor
                  readOnly
                  editorState={editorState}
                  toolbarClassName="toolbarClassName1"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={setEditorState}
                />
              </div>
              <button onClick={onCheck}>Check</button>
            </Col> */}
            <Col className="text-center">
              {/* <h1>Screen 2</h1> */}
              {/* <Editor
                editorState={splitEditorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setSplitEditorState}
              /> */}
              <CKEditor
                    editor={ ClassicEditor }
                    config={{
                        readOnly: true
                    }}
                    data={editorData}
                    onReady={editor => {
                        console.log("editpr : ", editor)
                      }}
                    
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log(  "data :", data );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </Col>
          </Row>
          <Row>
            <Col lg-6>
                <Row>
                <Col lg-2>
                    <p>1</p>
                </Col>
                <Col lg-10>
                    <p>Mark</p>
                </Col>
                </Row>
            </Col>
            <Col lg-6>
            <Row>
                <Col lg-2>
                    <p>1</p>
                </Col>
                <Col lg-10>
                <input type="text" className="splitText"></input>
                </Col>
                </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SplitScreen
