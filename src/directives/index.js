//定义懒加载插件

import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app) {
    //懒加载指令逻辑
    app.directive('img-lazy', {
      mounted(el, binding) {
        //el:指令所绑定的元素  （img）
        //binding：binding.value  指令的等于号后面所绑定的表达式的值 （即url）
        //vueUse 组件，检测某一个dom元素是否进入视口区域
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            // console.log(isIntersecting)
            if (isIntersecting) {
              //进入视口区域
              el.src = binding.value
              stop()
            }
          }
        )
      }
    })
  }
}