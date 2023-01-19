import {
  get,
  post,
  put,
  plainDelete,
  postFormData,
  mediaUpload,
  patch,
  postWithFormData,
} from "./coreApiServices"

export const axiosGet = api => {
  return get(api)
}

export const axiosGetWithToken = async (api, token) => {
  let headers = {
    Authorization: `${token}`,
  }

  let result = await get(api, headers)
  return result
}

export const axiosPost = (api, body) => {
  return post(api, body)
}

export const axiosPostWithHeader = (api, body, token) => {
  let headers = {
    Authorization: `${token}`,
  }
  return post(api, body, headers)
}

export const axiosPostWithToken = (api, body, token) => {
  let headers = {
    Authorization: `${token}`,
  }
  return post(api, body, headers)
}

export const axiosPostFormData = async (api, body) => {
  return postFormData(api, body)
}

export const axiosPut = (api, body, token = null) => {
  let headers = token === null ? {} : { Authorization: `${token}` }
  return put(api, body, headers)
}

export const axiosPatchWithToken = (api, body, token = null) => {
  let headers = token === null ? {} : { Authorization: `${token}` }
  return patch(api, body, headers)
}

export const axiosDelete = (api, token = null) => {
  let headers = token === null ? {} : { Authorization: `${token}` }
  return plainDelete(api, headers)
}

export const axiosMediaUpload = async (url, media, data, token) => {
  return mediaUpload(url, media, data, token)
}

export const axiosPostWithFormData = async (url, body, token = null) => {
  return postWithFormData(url, body, token)
}
