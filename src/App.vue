<template>
  <div id="app">
    <audio src id="buttonAudio"></audio>
    <nav-gation v-show="navShow" :title="title"></nav-gation>
    <div style="height:100%" :class="{child: navShow}">
      <transition :name="transitionName">
        <router-view class="router"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import NavGation from "./components/NavGation.vue";
import Login from "./script/login.js";
import { async } from "q";
export default {
  components: {
    NavGation
  },
  data() {
    return {
      transitionName: "fade",
      title: "滴答比赛",
      navShow: false
    };
  },
  created() {
    //检测浏览器类型决定是否展示nav栏
    let isWe = this.utils.isWeChat() || this.utils.isQQ();
    this.navShow = !isWe;
    this.title = this.$route.meta.title;
    /**
     * 验证登陆
     * 1. 微信选择微信登陆
     * 2. 其他选择登陆页登陆
     */
    let login = new Login();
    //判断是否需要登陆
    if (login.noLogin(this.$route.path)) {
      return;
    }
    //判断是否登陆了
    (async () => {
      let checkResult;
      if (this.utils.isWeChat()) {
        checkResult = await login.checkLogin(location.href);
      } else {
        checkResult = await login.checkLogin();
      }

      /**
       * 检测是否登陆
       * 1. 登陆了则存储当前状态为登录态
       * 2. 未登录则查看是否是微信，是微信则微信登陆，否则跳到登陆页
       */
      if (checkResult.isLogin) {
        this.$store.commit("setIsLogin", true);
      } else {
        if (checkResult.url) {
          let code = this.utils.getUrlString("code");
          if (code) {
            let isRegister = await login.wechatLogin(code);
            if (!isRegister) {
              this.$router.push({ path: "/register", replace: false });
            }
          } else {
            location.href = checkResult.url;
          }
        } else {
          this.$router.push({ path: "/login", replace: true });
        }
      }
    })();
  },
  // 基于路线变化的动态设置路由切换动画
  watch: {
    $route(to, from) {
      this.title = to.meta.title;
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      if (toDepth != fromDepth) {
        this.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";
      } else {
        this.transitionName = "fade";
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
  transition: all 500ms ease;
  box-shadow: -2px 0 30px rgba(0, 0, 0, 0.1);
}
.child {
  height: 100%;
  padding-top: 46px;
}
.child > div {
  height: 93%;
  height: calc(100% - 46px);
}

.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
  z-index: 1000;
}
/*解决页面层级显示在滑动上层问题*/
.slide-left-leave-active,
.slide-left-leave-to {
  z-index: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>