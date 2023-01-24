import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"
import { API } from "config/api"
import { axiosGet, axiosPost } from "services/apiServices"
import * as commonAction from "store/actions"

export const loginUser = user => {
  return async dispatch => {
    axiosPost(API.LOGIN_USER, user)
      .then(res => {
        if (res.status === 200) {
          
          localStorage.setItem("authUser", res.data)
          dispatch({
            type: LOGIN_USER,
            payload: res,
          })
          dispatch(
            commonAction.sendSnackAlert("success", "Successfully Logged in!!")
          )
          loginSuccess()
        } else {
          dispatch(
            commonAction.sendSnackAlert(
              "error",
              "Login failed. Please check the credentials entered."
            )
          )
        }
      })
      .catch(err => {
        dispatch(
          commonAction.sendSnackAlert(
            "error",
            "Something went wrong. Please try again."
          )
        )
      })
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  localStorage.removeItem("authUser")
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}
