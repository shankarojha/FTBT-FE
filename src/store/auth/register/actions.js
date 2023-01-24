import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
  RESET_REGISTER_STATE
} from "./actionTypes"

import {API} from 'config/api'
import * as commonAction from 'store/actions'
import { axiosPost } from "services/apiServices"

export const registerUser = user => {
  return async dispatch=>{
    // type: REGISTER_USER,
    // payload: { user },

    axiosPost(API.REGISTER_USER, user)
      .then(res=>{
        if(res.status === 201){
          dispatch({
            type: REGISTER_USER,
            payload: { res },
          })
          dispatch(
            commonAction.sendSnackAlert("success", "Successfully Registered!!")
          )
          dispatch(registerUserSuccessful(res))

        }else{
          dispatch(
            commonAction.sendSnackAlert(
              "error",
              "Registration failed. Please check the credentials entered."
            )
          )
          dispatch(registerUserFailed(user.email))
        }
      })

  }
}

export const registerUserSuccessful = user => {
  return {
    type: REGISTER_USER_SUCCESSFUL,
    payload: user,
  }
}

export const registerUserFailed = user => {
  console.warn("actions/user : " ,user)
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}

export const resetRegisterState = user =>{
  return {
    type: RESET_REGISTER_STATE,
    payload:null
  }
}
