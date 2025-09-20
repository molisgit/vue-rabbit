import { computed, ref } from "vue"
import { defineStore } from 'pinia'
import { getUserStore } from "./userStore"
import { insertCartAPI, getNewCartListAPI, delCartAPI } from "@/apis/cart"

export const useCartStore = defineStore('cart', () => {
  // 1.定义statu
  const cartList = ref([])

  // 2.1 定义action
  const userStore = getUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  const updateNewList = async () => {
    const res = await getNewCartListAPI()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //登录之后，调用接口 1.加入购物车 2.获取购物车列表
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      // 添加购物车操作 已添加：count + 1 ，未添加： cartList.value.push 
      // 通过匹配传递过来的商品对象中的skuId,如果能在cartList中找到，就是添加过的商品
      const item = cartList.value.find(item => goods.skuId === item.skuId)
      //find返回的是浅拷贝 修改对象的属性会改变原来对象
      //找到了
      if (item) {
        item.count += goods.count
      } else {
        //没找到
        cartList.value.push(goods)
      }
    }
  }

  // 2.2 定义删除购物车的action
  const delCart = async (skuId) => {
    if (isLogin) {
      //调用删除接口
      await delCartAPI([skuId])
      updateNewList()
    } else {
      // 匹配cartList中的skuId,获得对应下标（索引）
      const index = cartList.value.findIndex(item => skuId === item.skuId)
      cartList.value.splice(index, 1)
    }
  }

  // 2.3 退出登录时清空购物车
  const clearCart = () => {
    cartList.value = []
  }

  //单选框绑定（视图->数据）
  const singleCheck = (skuId, selected) => {
    //查找匹配的商品
    const item = cartList.value.find(item => skuId === item.skuId)
    //修改selected的值，与视图一致
    item.selected = selected
  }

  //全选框（视图->数据）
  const allCheck = (selected) => {
    //把cartList中的每一项selected都设置为跟全选框相同的状态
    cartList.value.forEach(item => item.selected = selected)
  }

  // 3. 计算属性
  // 3.1 总的数量 所有项的count之和
  // 3.2 总的价格 所有项的count * price之和

  const allCount = computed(() => {
    return cartList.value.reduce((prev, cur) => {
      return prev + cur.count
    }, 0)
  })
  const allPrice = computed(() => {
    return cartList.value.reduce((prev, cur) => {
      return prev + cur.count * cur.price
    }, 0)
  })

  //every方法：检查数组中的所有元素是否都满足指定条件。返回值：true或false
  //是否全选
  const isAll = computed(() => cartList.value.every(item => item.selected))

  // 3.3 已勾选的商品数量
  // filter先筛选selected为true的返回新数组，新数组再用reduce方法，返回一个累加值
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((prev, cur) => prev + cur.count, 0))
  // 3.4 已勾选的商品价格合计
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((prev, cur) => prev + cur.count * cur.price, 0))

  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    selectedCount,
    selectedPrice,
    addCart,
    delCart,
    singleCheck,
    allCheck,
    clearCart
  }
}, {
  persist: true,
})