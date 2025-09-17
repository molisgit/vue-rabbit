import { getBannerAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

export function useBanner() {
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerAPI({
      distributionSite: '2'
    })
    bannerList.value = res.result
  }

  //用onMounted把 getBanner 调起来
  onMounted(() => getBanner())

  return {
    bannerList
  }
}