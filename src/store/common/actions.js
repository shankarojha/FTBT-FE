import {
  COMMON_MEDIA_UPLOAD,
  ALERT_MESSAGE,
  CLEAR_ALERT_MESSAGE,
} from "./actionTypes"
import { axiosMediaUpload } from "services/apiServices"
import { API } from "config/api"

export const commonMediaUpload = (media, data, handleAcceptedFiles) => {
  return async dispatch => {
    const token = "Brearer " + (await localStorage.getItem("authUser"))
    console.log(data)
    axiosMediaUpload(API.MEDIA_UPLOAD, media, data, token)
      .then(res => {
        if ((res.status = 200)) {
          handleAcceptedFiles(media, res)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const sendSnackAlert = (type, message, title) => {
  return {
    type: ALERT_MESSAGE,
    payload: { type, message, title },
  }
}

export const clearSnackAlert = () => {
  return {
    type: CLEAR_ALERT_MESSAGE,
    payload: {},
  }
}
