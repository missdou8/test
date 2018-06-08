import VueRouter from "vue-router";
import App from "../App.vue";
import Vue from "vue";

Vue.use(VueRouter);

const config = [
  {
    path: "/",
    component: App
  }
];

const router = new VueRouter({
  mode: "history",
  config
});

export default router;
