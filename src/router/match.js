import Index from "../views/match/Index.vue";
import Detail from "../views/match/Detail.vue";

const MATCH_ROUTERS = [
  {
    path: "match",
    component: Index,
    meta: {
      title: "广告主"
    }
  },
  {
    path: "match/detail",
    component: Detail,
    meta: {
      title: "比赛详情"
    }
  }
];

export default MATCH_ROUTERS;
