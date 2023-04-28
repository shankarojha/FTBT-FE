export const BaseURL = "http://127.0.0.1:8080"
const proxyURL = "http://192.168.0.106:8080"
const gatewayURL = "http://192.168.0.106:9876"
const proxyPath = "/api"
const erpPath = "http://nerps.knowledgew.com:4500/api"
const localURL = "http://127.0.0.1:3000/api"

export const API = {
  // MEDIA UPLOAD
  MEDIA_UPLOAD: `${BaseURL}/users/fileUpload`,

  //Gateway Authentication
  LOGIN_USERS_GATEWAY: `${gatewayURL}/users`,
  GATEWAY_CREDENTIALS: `${gatewayURL}/credentials`,

  //Authentication
  LOGIN_USER: `${BaseURL}/users/login`,
  USER: `${proxyURL}/users`,
  REGISTER_USER: `${BaseURL}/users/signup`,

  //projects
  PROJECTS_FETCH: `${proxyURL}/projects`,
  LANGUAGES_FETCH:`${erpPath}/getLanguages`,
  SERVICES_FETCH:`${erpPath}/getServices`,
  PROJECT_FILES_FETCH:`${localURL}/ftbtGetAssignedFiles`
}
