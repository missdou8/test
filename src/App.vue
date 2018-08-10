<template>
  <div id="app">
    <audio src="" id="buttonAudio"></audio>
    <NavGation v-show="navShow" :title="title"></NavGation>
    <div style="height:100%" :class="{child: navShow}">
      <transition :name="transitionName">
        <router-view class="router"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import NavGation from "./components/NavGation.vue";
import { isWeChat, isQQ } from "lputils";
export default {
  components: {
    NavGation
  },
  data() {
    return {
      transitionName: "fade",
      title: "滴答比赛",
      navShow: false,
    };
  },
  created() {
    //检测浏览器类型决定是否展示栏
    let isWe = isWeChat() || isQQ();
    this.navShow = !isWe;
    this.title = this.$route.meta.title;
    if(this.jubgeCurrentPath()) return ;
    //检测用户登录状态与用户权限
    let userInfo = localStorage.getItem("userInfo");
    this.http.user.checkLogin().then(result => {
      /**
       * 判断是否登录
       * 1. true: 判断是否认证
       *     0: 审核通过    （跳转首页）
       *     1: 审核中      （跳转审核页）
       *     2：审核未通过  （跳转登录页显示状态）
       * 2. false: 跳到登录页
       */
      if (result.data.isLogin == 1) {
        return;
      } else {
        this.$store.commit("setIsLogin", false);
        this.$router.push({ path: "/login", replace: true });
      }
    });
  },
  // 基于路线变化的动态设置路由切换动画
  watch: {
    $route(to, from) {
      //如果登录切是从match到login页的话直接到match
      if(to.path==='/login'&&from.path==='/match'&&this.$store.state.user.isLogin){
        this.$router.push({ path: "/match", replace: true });
      }else if(!this.$store.state.user.isLogin&&!this.jubgeCurrentPath()){
        this.$router.push({ path: "/login", replace: true });
      }
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
  },
  methods:{
    jubgeCurrentPath(){
      let currentPath = this.$route.path;
      if (
        //设置不需要检测登录的页面
        currentPath == "/registerTips" ||
        currentPath == "/register" ||
        currentPath == "/login" ||
        currentPath == "/match/share"||
        currentPath == "/findPwd"||
        currentPath == "/resetPwd"
      ) {
        return true;
      }else{
        return false;
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
  background-color: #f5f5f5;
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
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>