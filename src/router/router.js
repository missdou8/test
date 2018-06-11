import VueRouter from "vue-router";
import App from "../App.vue";
import Vue from "vue";
//路由配置
import matchConfig from "./match.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: App,
    redirect: "/match/index",
    children: [].concat(matchConfig)
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
