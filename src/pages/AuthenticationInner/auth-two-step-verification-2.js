import React from "react"
import CarouselPage from "./CarouselPage"

//Verification code package
import AuthCode from "react-auth-code-input"

// import images
import logodark from "../../assets/images/KW_Logo_Transparency.png"
import logolight from "../../assets/images/KW_Logo_Transparency.png"
import { Col, Form, FormGroup, Label, Row } from "reactstrap"
import { Link } from "react-router-dom"

const TwostepVerification2 = () => {
  return (
    <React.Fragment>
      <div>
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <CarouselPage />

            <Col xl={3}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="dashboard" className="d-block auth-logo">
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
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div className="text-center">
                        <div className="avatar-md mx-auto">
                          <div className="avatar-title rounded-circle bg-light">
                            <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                          </div>
                        </div>
                        <div className="p-2 mt-4">
                          <h4>Verify your email</h4>
                          <p className="mb-5">
                            Please enter the 4 digit code sent to{" "}
                            <span className="font-weight-semibold">
                              example@abc.com
                            </span>
                          </p>

                          <Form>
                            <Row>
                              <Col xs={12}>
                                <FormGroup className="verification-2">
                                  <Label
                                    htmlFor="digit1-input"
                                    className="sr-only"
                                  >
                                    Dight 1
                                  </Label>
                                  <AuthCode
                                    characters={4}
                                    className="form-control form-control-lg text-center"
                                    inputStyle={{
                                      width: "60px",
                                      height: "calc(1.5em + 1rem + 2px)",
                                      padding: ".5rem 1rem",
                                      borderRadius: "8px",
                                      fontSize: "20px",
                                      textAlign: "center",
                                      marginRight: "15px",
                                      border: "1px solid #ced4da",
                                      textTransform: "uppercase",
                                    }}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>

                          <div className="mt-4">
                            <Link
                              to="dashboard"
                              className="btn btn-success w-md"
                            >
                              Confirm
                            </Link>
                          </div>
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
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TwostepVerification2
