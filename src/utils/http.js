//axios的基础封装
import axios from 'axios'
import "element-plus/theme-chalk/el-message.css";
import { ElMessage } from 'element-plus';
import { getUserStore } from '@/stores/user';
import router from '@/router';

const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
  //1.从pinia获取token数据
  const userStore = getUserStore()
  const token = userStore.userInfo.token
  //2.按照后端的要求拼接token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
instance.interceptors.response.use(res => res.data, e => {
  const userStore = getUserStore()
  //统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  // token过期 401拦截处理
  if (e.response.status === 401) {
    userStore.clearUserInfo()
    router.push({ path: '/login' })
  }
  return Promise.reject(e)
})


export default instance