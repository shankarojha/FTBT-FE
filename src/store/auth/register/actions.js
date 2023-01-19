import {
  REGISTER_USER,
  REGISTER_USER_SUCCESSFUL,
  REGISTER_USER_FAILED,
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
        console.log("res:" , res)
        if(res.status === 201){
          dispatch({
            type: REGISTER_USER,
            payload: { user },
          })
          dispatch(
            commonAction.sendSnackAlert("success", "Successfully Registered!!")
          )
          registerUserSuccessful()

        }else{
          dispatch(
            commonAction.sendSnackAlert(
              "error",
              "Registration failed. Please check the credentials entered."
            )
          )
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
  return {
    type: REGISTER_USER_FAILED,
    payload: user,
  }
}
