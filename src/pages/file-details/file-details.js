import React, { Component, useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Alert, Container, Table, Button } from "reactstrap"
import { Link } from "react-router-dom"

const fileDetails = props => {

  const [services,setServices] = useState([])
  const onClickFunction = (arr) =>{
    setServices(prevState=>({
      arr
    }))
  }

  useEffect(()=>{
    console.log(services)
  },[onClickFunction])

  return (
    <>
      <div className="page-content">
        <Container>
          <Row>
            <Col md={12}>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td><Button onClick={()=>{onClickFunction(["hello"])}}>Click</Button></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default fileDetails
