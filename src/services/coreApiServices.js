import axios from "axios"
import qs from "qs"
// import * as authAction from "../actions/authAction";
import store from "../store";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
}

const attachDefaultContentType = header => {
  if (header["Content-Type"] === null || header["Content-Type"] === undefined) {
    header["Content-Type"] = "application/json"
    header["authorization"] = "Bearer " + localStorage.getItem("authUser")
  }
  return header
}

// get method
export const get = async (api, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let response = await axios
    .get(api, { headers: headers })
    .then(res => ({
      data: res.data,
      status: res.status,
    }))
    .catch(err => err.response)
  // if (response.status && response.status === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return response
}

// Post method
export const post = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let response = await axios
    .post(api, body, {
      headers: headers,
    })
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response)
  // if (response.status && response.status === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }
  return response
}

// Put method
export const put = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let args = [api, body]

  if (headers) {
    args = [
      api,
      body,
      {
        headers: headers,
      },
    ]
  }
  let response = await axios
    .put(...args)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response)
  // if (response.status && response.status === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return response
}
// Patch method
export const patch = async (api, body, headers = {}) => {
  headers = attachDefaultContentType(headers)
  let args = [api, body]

  if (headers) {
    args = [
      api,
      body,
      {
        headers: headers,
      },
    ]
  }
  let response = await axios
    .patch(...args)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response)
  // if (response.status && response.status === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return response
}

// delete
export const plainDelete = async (api, headers) => {
  headers = attachDefaultContentType(headers)
  let args = [api]
  if (headers) {
    args = [
      api,
      {
        headers: headers,
      },
    ]
  }
  let response = await axios
    .delete(...args)
    .then(res => ({ data: res.data, status: res.status }))
    .catch(err => err.response)
  // if (response.status && response.status === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return response
}

// post form data
export const postFormData = async (api, body) => {
  let result = await axios.post(api, qs.stringify(body), config)
  let response = {
    status: result.status,
    data: result.data,
  }
  // if (response.status && response.status === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return response
}

export const mediaUpload = async (url, media, data, token) => {
  let headers = {
    authorization: token,
    accept: "application/json",
    "Content-Type": `multipart/form-data`,
  }
  let formData = new FormData()
  media.forEach(element => {
    formData.append("files", element)
  })
  formData.append("proName", data.proName)
  formData.append("proId", data.proId)

  // for (var key of formData.entries()) {
  //   //console.log("data>formdata", key[0] + ", " + JSON.stringify(key[1]))
  // }

  let result = await axios.post(url, formData, { headers, 
    // onUploadProgress:(data)=>{
    //   //console.log("data from coreApiServices:",data)
    //   store.dispatch(data)
    // }
   })
   //console.log("result:",result)
  // if (result.status_code && result.status_code === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return {
    status: result.status_code,
    data: result.data,
  }
}

export const postWithFormData = async (url, body, token) => {
  let headers = {
    authorization: token,
    accept: "application/json",
    "Content-Type": `multipart/form-data`,
  }

  let result = await axios.post(url, body, { headers })
  // if (result.status_code && result.status_code === 403) {
  //   store.dispatch(authAction.sessionLogout());
  // }

  return {
    status: result.status,
    data: result.data,
  }
}
