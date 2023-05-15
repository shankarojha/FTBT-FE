import React from "react";
import {
    Button,
    Col,
    Container,
    Row,
    Table 
  } from "reactstrap"
  import Breadcrumbs from "../../components/Common/Breadcrumb";


const statusDetails = (props) =>{
return(
    <React.Fragment>
        <div className="page-content">
            <Container fluid>
                <Row>
                    <Col lg="12">
                        <h1>Status Details</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    </React.Fragment>
)

}

export default statusDetails