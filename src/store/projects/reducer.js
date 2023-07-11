import {
  CREATE_PROJECT_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_DETAIL_FAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_FILE_DETAILS_SUCCESS,
  GET_FILTERED_DATA_SUCCESS
} from "./actionTypes"

const INIT_STATE = {
  projects: [],
  projectDetail: {},
  error: {},
  projectStatus: {},
  filteredData: []
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

    // case GET_FILE_DETAILS_SUCCESS:
    //   return{
    //     ...state,
    //     fileDetails:action.payload
    //   }

      case GET_FILTERED_DATA_SUCCESS:
      return {
        ...state,
        filteredData: action.payload,
      }

    default:
      return state
  }
}

export default projects
