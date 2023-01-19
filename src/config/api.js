export const BaseURL = "http://127.0.0.1:8080"
const proxyURL = "http://192.168.0.106:8080"
const gatewayURL = "http://192.168.0.106:9876"
const proxyPath = "/api"

export const API = {
  // MEDIA UPLOAD
  MEDIA_UPLOAD: `${proxyURL}/fileupload`,

  //Gateway Authentication
  LOGIN_USERS_GATEWAY: `${gatewayURL}/users`,
  GATEWAY_CREDENTIALS: `${gatewayURL}/credentials`,

  //Authentication
  LOGIN_USER: `${BaseURL}/users/login`,
  USER: `${proxyURL}/users`,
  REGISTER_USER: `${BaseURL}/users/signup`,

  //projects
  PROJECTS_FETCH: `${proxyURL}/projects`,
}
