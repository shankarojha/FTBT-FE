import React, { useState } from "react";
import { Container,Row,Col } from "reactstrap";
import Breadcrumbs from "components/Common/Breadcrumb"
import { Editor,EditorState } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "./SplitScreen.scss"

const SplitScreen=props=>{

    const[editorState,setEditorState]=useState()
    const[splitEditorState,setSplitEditorState]=useState()

    const onCheck=()=>{
        console.log(editorState.getCurrentContent().getPlainText('\u0001'))
    }


return(

   <React.Fragment>
    <div className="page-content">
        <Container fluid>
        <Breadcrumbs title="Projects" breadcrumbItem="Splitscreen"></Breadcrumbs>
        <Row>
            <Col sm-6 className="editorWrapper text-center">
                <h1>Screen 1</h1>
                <div >
                <Editor
                   readOnly
                    editorState={editorState}
                    toolbarClassName="toolbarClassName1"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        options: [],
                        inline: { inDropdown: false },
                        list: { inDropdown: false },
                        textAlign: { inDropdown: false },
                        link: { inDropdown: false },
                        history: { inDropdown: false },
                    }}
                 />
                </div>
                 <button onClick={onCheck}>Check</button>
            </Col>
            <Col lg-6 className="text-center">
                <h1>Screen 2</h1>
                <Editor
                    editorState={splitEditorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setSplitEditorState}
                />
            </Col>
        </Row>
        </Container>
    </div>
   </React.Fragment>
)
}

export default SplitScreen