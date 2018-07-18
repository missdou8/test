import Index from "../views/match/Index.vue";
import Detail from "../views/match/Detail.vue";
import Create from "../views/match/Create.vue";
import MatchStyle from "../views/match/MatchStyle.vue";
import MathchEdit from "../views/match/MathchEdit.vue";
import Prize from "../views/match/Prize.vue";
import PrizeAddress from "../views/match/PrizeAddress.vue";
import Share from "../views/match/Share.vue";
import ShareImg from "../views/match/ShareImg.vue";
import WinnerList from "../views/match/WinnerList.vue";

const MATCH_ROUTERS = [
  {
    path: "/match",
    component: Index,
    meta: {
      title: "广告主"
    }
  },
  {
    path: "/match/detail",
    component: Detail,
    meta: {
      title: "比赛详情"
    }
  },
  {
    path: "/match/create",
    component: Create,
    meta: {
      title: "创建比赛"
    }
  },
  {
    path: "/match/style",
    component: MatchStyle,
    meta: {
      title: "赛制设置"
    }
  },
  {
    path: "/match/edit",
    component: MathchEdit,
    meta: {
      title: "修改比赛信息"
    }
  },
  {
    path: "/match/style/prize",
    component: Prize,
    meta: {
      title: "填写奖品信息"
    }
  },
  {
    path: "/match/style/prize/address",
    component: PrizeAddress,
    meta: {
      title: "自提地址"
    }
  },
  {
    path: "/match/share",
    component: Share,
    meta: {
      title: "分享邀请码"
    }
  },
  {
    path: "/match/shareImg",
    component: ShareImg,
    meta: {
      title: "添加分享图片"
    }
  },
  {
    path: "/match/winnerList",
    component: WinnerList,
    meta: {
      title: "获奖列表"
    }
  }
];

export default MATCH_ROUTERS;
