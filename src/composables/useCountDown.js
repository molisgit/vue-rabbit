//封装倒计时逻辑函数

import { computed, onUnmounted, ref } from "vue"
import { dayjs } from "element-plus"

export const useCountDown = () => {
  let timer = null
  const time = ref(0)
  //格式化时间
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  //开启倒计时的函数
  const start = (currentTime) => {
    //开启倒计时的逻辑
    time.value = currentTime
    timer = setInterval(() => {
      //核心逻辑：每隔1s就减一
      time.value--
      //倒计时结束后自动清除定时器（避免内存泄漏）
      if (time.value <= 0) {
        clearInterval(timer)
        timer = null //重置定时器变量
      }
    }, 1000);
  }

  //组件销毁时清除定时器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }

}