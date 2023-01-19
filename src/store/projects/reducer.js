import {
  CREATE_PROJECT_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_DETAIL_FAIL,
  GET_PROJECT_DETAIL_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  projects: [],
  projectDetail: {},
  error: {},
  projectStatus: {},
}

const projects = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
      }

    case GET_PROJECTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        projectDetail: action.payload,
      }

    case GET_PROJECT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projectStatus: action.payload,
      }

    default:
      return state
  }
}

export default projects
