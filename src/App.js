import PropTypes from 'prop-types'
import React,{useState,useEffect} from "react"

import { Switch, BrowserRouter as Router } from "react-router-dom"
import { connect,useSelector } from "react-redux"

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes"

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware"
import SnackAlert from "components/Common/SnackAlert"
// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"

// Import Firebase Configuration file
import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "./helpers/AuthType/fakeBackend"



const App = props => {
  const layout = useSelector(state => state.Layout)
  const [isAuthProtected, setisAuthProtected] = useState()
  const checkAuthProtected = useSelector(state => state.Login.isAuthProtected)
  const alert = useSelector(state => state.common.alert)

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      setisAuthProtected(!isAuthProtected)
    }
  }, [checkAuthProtected])
  function getLayout() {
    let layoutCls = VerticalLayout

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = HorizontalLayout
        break
      default:
        layoutCls = VerticalLayout
        break
    }
    return layoutCls
  }

  const Layout = getLayout()
  return (
    <React.Fragment>
       {alert ? <SnackAlert /> : null}
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={isAuthProtected}
            />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={!isAuthProtected}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any
}

const mapStateToProps = state => {
  return {
    layout: state.Layout,
  }
}

export default connect(mapStateToProps, null)(App)
