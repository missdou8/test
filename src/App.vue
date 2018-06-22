<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router"></router-view>
    </transition>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      transitionName: "fade"
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   let currentPath = to.path;
  //   if ( //设置不需要检测登录的页面
  //     currentPath == "/registerTips" ||
  //     currentPath == "/register" ||
  //     currentPath == "/login"
  //   ) {
  //     return next();
  //   }
  //   //检测用户登录状态与用户权限
  //   let userInfo = localStorage.getItem("userInfo");
  //   axios.post("/index.php/api/user/checkLogin").then(result => {
  //     /**
  //      * 判断是否登录
  //      * 1. true: 判断是否认证
  //      *     0: 审核通过    （跳转首页）
  //      *     1: 审核中      （跳转审核页）
  //      *     2：审核未通过  （跳转登录页显示状态）
  //      * 2. false: 跳到登录页
  //      */
  //     if (result.data.data.islogin == 1) {
  //       if (userInfo.iscertification == 0) next({ path: "/match/index", replace: true });
  //       else if(userInfo.iscertification == 1) next({ path: "/register", replace: true });
  //       else next({ path: "/login", replace: true });
  //     } else {
  //       next({ path: "/login", replace: true });
  //     }
  //   });
  // },
  // 基于路线变化的动态设置路由切换动画
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (toDepth != fromDepth) {
        this.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";
      }else{
        this.transitionName ='fade'
      }
    }
  }
};
</script>
<style scoped>
#router_box {
  position: relative;
  height: 100%;
}
.router {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-bottom: 51px;
  background-color: #f5f5f5;
  transition: all 500ms ease;
  box-shadow: -2px 0 30px rgba(0, 0, 0, 0.1);
}

.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
  z-index: 1000;
}
/*解决页面层级显示在滑动上层问题*/
.slide-left-leave-active, 
.slide-left-leave-to{
  z-index: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>