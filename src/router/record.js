import fans from "../views/record/fans.vue";

const RECORD_ROUTERS = [
  {
    path: "user/record/fans",
    component: fans,
    meta: {
      title: "粉丝列表"
    }
  },
];

export default RECORD_ROUTERS;
