import {
  COMMON_MEDIA_UPLOAD,
  ALERT_MESSAGE,
  CLEAR_ALERT_MESSAGE,
} from "./actionTypes"

const INIT_STATE = {
  files: [],
  alert: {},
}

const Common = (state = INIT_STATE, action) => {
  switch (action.type) {
    case COMMON_MEDIA_UPLOAD:
      return {
        ...state,
        files: action.payload,
      }
    case ALERT_MESSAGE:
      return {
        ...state,
        alert: action.payload,
      }
    case CLEAR_ALERT_MESSAGE:
      return {
        ...state,
        alert: {},
      }
    default:
      return state
  }
}

export default Common
