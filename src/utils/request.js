import axios from 'axios'
import { ErrorModal } from './Modal'

const service = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/`,
  timeout: 6000,
})
//请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}` // 携带权限参数
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
// 响应拦截器（所有接收到的请求都要从这儿过一次）
service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.data.status && error.response.data.status.toString().startsWith('4')) {
      return Promise.reject(error.response.data)
    }
    if (error.response.data.status && error.response.data.status.toString().startsWith('5')) {
      ErrorModal(`服务器错误，${error.response.data.detail || '请联系开发人员'}`)
      return Promise.reject(error.response.data)
    }
  },
)
export default service
