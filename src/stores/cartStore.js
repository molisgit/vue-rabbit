import { ref } from "vue"
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  // 1.定义statu
  const cartList = ref([])
  // 2.定义action
  const addCart = (goods) => {
    // 添加购物车操作 已添加：count + 1 ，未添加： cartList.value.push 
    // 通过匹配传递过来的商品对象中的skuId,如果能在cartList中找到，就是添加过的商品
    const item = cartList.value.find(item => goods.skuId === item.skuId)
    //找到了
    if (item) {
      item.count += goods.count
    } else {
      //没找到
      cartList.value.push(goods)
    }
  }

  return {
    cartList,
    addCart
  }
}, {
  persist: true,
})