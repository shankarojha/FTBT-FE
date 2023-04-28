import React, { Component, useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Alert, Container, Table, Button } from "reactstrap"
import { Link,useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {getProjectFiles} from 'store/actions'

const fileDetails = props => {

  const params = useParams()
  const projectId = params.projectId
  const dispatch = useDispatch()
  const projectFiles = useSelector(state=>state.projects.fileDetails)
  console.log(projectFiles)

  useEffect(()=>{
    dispatch(getProjectFiles(projectId))
  },[])

  return (
    <>
      <div className="page-content">
        <Container>
          <Row>
            <Col md={12}>
              <Table className="text-center">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Status</th>
                    <th>Source Language</th>
                    <th>Target Language</th>
                  </tr>
                </thead>
                <tbody>
                  {projectFiles && projectFiles.map((el,ind)=>{
                    return(
                      <tr key={el._id}>
                        <td>{el.fileId}</td>
                        {el.status==="Completed" && <td style={{color:"green"}}>{el.status}</td>}
                        {el.status!=="Completed" && <td style={{color:"blue"}}>{el.status}</td>}
                        <td>{el.sourceLanguage}</td>
                        <td>{el.targetLanguage}</td>
                      </tr>
                    )
                  })}
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
