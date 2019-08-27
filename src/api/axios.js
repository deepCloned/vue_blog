import axios from 'axios'
import qs from 'qs'

import { configs } from './config'

import { Base64 } from 'js-base64'

import {
  Message
} from 'element-ui'

const baseUrl = configs.baseUrl
// const errorState = configs.errorCode

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 请求之前
  let token = localStorage.getItem('token')
  if (token) {
    let auth = 'Basic ' + encodeToken(token + ':')
    config.headers.Authorization = auth
    return config
  }
  return config
}, function (error) {
  // 请求错误该做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

function encodeToken (token) {
  return Base64.encode(token)
}

// 封装axios
function apiAxios (method, url, params) {
  let httpDefault = {
    method: method,
    baseURL: baseUrl,
    url: url,
    headers: {'Authorization': 'auth'},
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
    timeout: 5000
  }
  return new Promise((resolve, reject) => {
    axios(httpDefault)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        Message({
          message: err.response.data.message,
          type: 'error'
        })
        reject(err)
      })
  })
}

export default {
  install: function (Vue) {
    Vue.prototype.getAxios = (url, params) => apiAxios('GET', url, params)
    Vue.prototype.postAxios = (url, params) => apiAxios('POST', url, params)
    Vue.prototype.putAxios = (url, params) => apiAxios('PUT', url, params)
    Vue.prototype.delectAxios = (url, params) => apiAxios('DELECT', url, params)
  }
}
