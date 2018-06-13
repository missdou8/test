import VueRouter from "vue-router";
import App from "../App.vue";
import Vue from "vue";
//路由配置
import loginConfig from "./login.js"
import matchConfig from "./match.js";
import userConfig from "./user.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    redirect: "/match/index",
    children: [].concat(
      loginConfig,
      matchConfig,
      userConfig
    )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next();
});

export default router;
