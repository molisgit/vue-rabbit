//Pinia负责用户数据相关的state和action，组件中只负责触发action函数并传递参数

import { defineStore } from 'pinia'
import { LoginAPI } from '@/apis/user'
import { ref } from 'vue'

export const getUserStore = defineStore('user', () => {
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await LoginAPI({ account, password })
    userInfo.value = res.result
  }
  // 3. 以对象的形式把 statu 和 action return
  return {
    userInfo,
    getUserInfo
  }
}, {
  persist: true
})
