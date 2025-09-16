import { createApp } from 'vue'
import { createPinia } from 'pinia'
//引入懒加载指令插件并注册
import { lazyPlugin } from '@/directives/index'

import App from './App.vue'
import router from './router'

//引入初始化的样式文件
import '@/styles/common.scss'

//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res => {
//   console.log(res)
// })

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)

app.mount('#app')


