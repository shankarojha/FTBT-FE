import React from "react"
import { Link } from "react-router-dom"
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap"

// import ReactDOM from 'react-dom';
import logodark from "../../assets/images/KW_Logo_Transparency.png"
import logolight from "../../assets/images/KW_Logo_Transparency.png"
import CarouselPage from "./CarouselPage"
const Recoverpw2 = () => {
  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <a href="index.html" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="18"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </a>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary"> Reset Password</h5>
                        <p className="text-muted">Re-Password with Skote.</p>
                      </div>

                      <div className="mt-4">
                        <div
                          className="alert alert-success text-center mb-4"
                          role="alert"
                        >
                          Enter your Email and instructions will be sent to you!
                        </div>
                        <Form action="dashboard">
                          <FormGroup>
                            <Label for="useremail">Email</Label>
                            <Input
                              type="email"
                              className="form-control"
                              id="useremail"
                              placeholder="Enter email"
                            />
                          </FormGroup>

                          <FormGroup className="row mb-0">
                            <Col xs={12} className="text-right">
                              <button
                                className="btn btn-primary w-md waves-effect waves-light"
                                type="submit"
                              >
                                Reset
                              </button>
                            </Col>
                          </FormGroup>
                        </Form>
                        <div className="mt-5 text-center">
                          <p>
                            Remember It ?{" "}
                            <Link
                              to="page-login-2"
                              className="font-weight-medium text-primary"
                            >
                              {" "}
                              Sign In here
                            </Link>{" "}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                      <p className="mb-0">
                        © {new Date().getFullYear()} Skote. Crafted with{" "}
                        <i className="mdi mdi-heart text-danger"></i> by
                        Themesbrand
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Recoverpw2
