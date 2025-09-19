import { computed, ref } from "vue"
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  // 1.定义statu
  const cartList = ref([])
  // 2.1 定义action
  const addCart = (goods) => {
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

  // 2.2 定义删除购物车的action
  const delCart = (skuId) => {
    // 匹配cartList中的skuId,获得对应下标（索引）
    const index = cartList.value.findIndex(item => skuId === item.skuId)
    cartList.value.splice(index, 1)
  }

  //单选框绑定
  const singleCheck = (skuId, selected) => {
    //查找匹配的商品
    const item = cartList.value.find(item => skuId === item.skuId)
    //修改selected的值，与视图一致
    item.selected = selected
  }

  //全选框
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

  const isAll = computed(() => cartList.value.every(item => item.selected))


  return {
    cartList,
    allCount,
    allPrice,
    isAll,
    addCart,
    delCart,
    singleCheck,
    allCheck
  }
}, {
  persist: true,
})