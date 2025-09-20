<script setup>
import { getUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const useStore = getUserStore() 
const router = useRouter()

// 退出登录
const confirm = () => {
  //1.清空用户信息
  useStore.clearUserInfo()
  //2.跳转到登录页面
  router.replace({ path:'/login' })
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- if、else 多模板渲染 区分登录状态和非登录状态 -->
        <!-- 适配思路：是否有token -->
        <template v-if="useStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{useStore.userInfo.nickname}}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>