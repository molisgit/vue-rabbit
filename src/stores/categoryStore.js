//Store（直译为 “仓库”）是专门用于集中管理应用 “状态”（State）的容器。它的核心作用是解决 “跨组件数据共享” 和 “状态统一维护” 的问题，让复杂应用中的数据流转更可控、更清晰

//这个 Store 的核心作用是：将导航分类数据的存储、获取和更新逻辑集中管理，实现跨组件的数据共享和响应式更新

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout';

export const useCategoryStore = defineStore('category', () => {
  //导航列表的数据管理
  //state导航列表数据
  const categoryList = ref([])

  //获取导航数据的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }

  return { categoryList, getCategory }
})
