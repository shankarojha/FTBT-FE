import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"

// Redux
import { connect, useDispatch, useSelector } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//Social Media Imports
import { GoogleLogin } from "react-google-login"
// import TwitterLogin from "react-twitter-auth"
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props"

// actions
import { loginUser, apiError, socialLogin } from "store/actions"

// import images
import profile from "assets/images/profile-img.png"
import logo from "assets/images/KW_Logo_Transparency.png"
import * as authAction from "store/actions"

//Import config
import { facebook, google } from "../../config"

const Login = props => {
  const dispatch = useDispatch()

  const loginResult = useSelector(state => state.Login.user)
  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    let user_auth = {
      email: values.email,
      password: values.password,
    }
    dispatch(authAction.loginUser(user_auth))
  }

  useEffect(() => {
    if (loginResult.status === 200) {
      props.history.push("/projects-list")
    }
  }, [loginResult])

  // const signIn = (res, type) => {
  //   const { socialLogin } = props
  //   if (type === "google" && res) {
  //     const postData = {
  //       name: res.profileObj.name,
  //       email: res.profileObj.email,
  //       token: res.tokenObj.access_token,
  //       idToken: res.tokenId,
  //     }
  //     socialLogin(postData, props.history, type)
  //   } else if (type === "facebook" && res) {
  //     const postData = {
  //       name: res.name,
  //       email: res.email,
  //       token: res.accessToken,
  //       idToken: res.tokenId,
  //     }
  //     socialLogin(postData, props.history, type)
  //   }
  // }

  //handleGoogleLoginResponse
  // const googleResponse = response => {
  //   signIn(response, "google")
  // }

  //handleTwitterLoginResponse
  // const twitterResponse = e => {}

  //handleFacebookLoginResponse
  // const facebookResponse = response => {
  //   signIn(response, "facebook")
  // }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-soft-primary">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to FT/BT Tool.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            height="25"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {props.error && typeof props.error === "string" ? (
                        <Alert color="danger">{props.error}</Alert>
                      ) : null}

                      <div className="form-group">
                        <AvField
                          name="email"
                          label="Email"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <AvField
                          name="password"
                          label="Password"
                          value=""
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customControlInline"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                      {/* 
                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign in with</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <FacebookLogin
                              appId={facebook.APP_ID}
                              autoLoad={false}
                              callback={facebookResponse}
                              render={renderProps => (
                                <Link
                                  className="social-list-item bg-primary text-white border-primary"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-facebook" />
                                </Link>
                              )}
                            />
                          </li> */}
                      {/*<li className="list-inline-item">*/}
                      {/*  <TwitterLogin*/}
                      {/*    loginUrl={*/}
                      {/*      "http://localhost:4000/api/v1/auth/twitter"*/}
                      {/*    }*/}
                      {/*    onSuccess={this.twitterResponse}*/}
                      {/*    onFailure={this.onFailure}*/}
                      {/*    requestTokenUrl={*/}
                      {/*      "http://localhost:4000/api/v1/auth/twitter/revers"*/}
                      {/*    }*/}
                      {/*    showIcon={false}*/}
                      {/*    tag={"div"}*/}
                      {/*  >*/}
                      {/*    <a*/}
                      {/*      href=""*/}
                      {/*      className="social-list-item bg-info text-white border-info"*/}
                      {/*    >*/}
                      {/*      <i className="mdi mdi-twitter"/>*/}
                      {/*    </a>*/}
                      {/*  </TwitterLogin>*/}
                      {/*</li>*/}
                      {/* <li className="list-inline-item">
                            <GoogleLogin
                              clientId={google.CLIENT_ID}
                              render={renderProps => (
                                <Link
                                  className="social-list-item bg-danger text-white border-danger"
                                  onClick={renderProps.onClick}
                                >
                                  <i className="mdi mdi-google" />
                                </Link>
                              )}
                              onSuccess={googleResponse}
                              onFailure={() => {}}
                            />
                          </li>
                        </ul>
                      </div> */}

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock mr-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </AvForm>
                  </div>
                  <div class="ocean">
                    <div class="wave"></div>
                    <div class="wave"></div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="font-weight-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                {/* <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

Login.propTypes = {
  error: PropTypes.any,
  history: PropTypes.object,
  loginUser: PropTypes.func,
}
