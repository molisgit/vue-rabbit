<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

//触发获取导航列表的action
import {useCategoryStore} from '@/stores/categoryStore'
import { onMounted } from 'vue'

//执行方法，得到一个实例对象
const categoryStore = useCategoryStore()

//mounted构造函数里面把实例对象里的小方法调用起来
onMounted(()=>{
  categoryStore.getCategory()
})

</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 添加key 破坏复用机制 强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />
  <LayoutFooter />
</template>