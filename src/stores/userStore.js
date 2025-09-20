//Pinia负责用户数据相关的state和action，组件中只负责触发action函数并传递参数

import { defineStore } from 'pinia'
import { LoginAPI } from '@/apis/user'
import { ref } from 'vue'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const getUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    // 获取登录返回的用户信息
    const res = await LoginAPI({ account, password })
    userInfo.value = res.result
    //合并购物车的操作
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }

  // 退出登录时清空用户信息  以及购物车
  const clearUserInfo = () => {
    userInfo.value = {}
    //localStorage会和pinia持久化插件保持一致

    //执行清除购物车的action
    cartStore.clearCart()
  }

  // 3. 以对象的形式把 statu 和 action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true
})
