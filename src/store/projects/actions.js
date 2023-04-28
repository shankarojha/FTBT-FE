import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_FAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  GET_FILE_DETAILS_SUCCESS
} from "./actionTypes"
import { API } from "config/api"
import { axiosPost, axiosGet } from "services/apiServices"
import * as commonAction from "store/actions"
//import { useDispatch } from "react-redux"

export const getProjects = () => {
  return async dispatch => {
    axiosGet(API.PROJECTS_FETCH).then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_PROJECTS_SUCCESS,
          payload: res.data,
        })
      }
    })
  }
}

export const getProjectById = projectId => {
  return async dispatch => {
    axiosGet(API.PROJECTS_FETCH + "?projectId=" + projectId).then(res => {
      if (res.status === 200) {
        dispatch({
          type: GET_PROJECT_DETAIL_SUCCESS,
          payload: res.data,
        })
      }
    })
  }
}

export const createProject = project => {
  return async dispatch => {
    axiosPost(API.PROJECTS_FETCH, project)
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: CREATE_PROJECT_SUCCESS,
            payload: res.data,
          })
          dispatch(
            commonAction.sendSnackAlert(
              "success",
              "Project Created Successfully"
            )
          )
        } else {
          dispatch(
            commonAction.sendSnackAlert("error", " Failed , Please Try Again.")
          )
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(
          commonAction.sendSnackAlert(
            "error",
            "Something went wrong. Please try again."
          )
        )
      })
  }
}


export const getProjectFiles = projectId =>{
  return async dispatch=>{
    axiosGet(API.PROJECT_FILES_FETCH+"/"+projectId)
    .then((res)=>{
      if(res.status===200){
        dispatch({
          type:GET_FILE_DETAILS_SUCCESS,
          payload:res.data
        })
      }

    }).catch((err)=>{console.log(err)})
  }
}



export const getProjectsSuccess = projects => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects,
})

export const getProjectsFail = error => ({
  type: GET_PROJECTS_FAIL,
  payload: error,
})

export const getProjectDetail = projectId => ({
  type: GET_PROJECT_DETAIL,
  projectId,
})

export const getProjectDetailSuccess = projectDetails => ({
  type: GET_PROJECT_DETAIL_SUCCESS,
  payload: projectDetails,
})

export const getProjectDetailFail = error => ({
  type: GET_PROJECT_DETAIL_FAIL,
  payload: error,
})

export const getFileDetailsSuccess= projectId => ({
  type:GET_FILE_DETAILS_SUCCESS,
  projectId
})

