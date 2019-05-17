import Index from '../views/match/Index.vue'
import Detail from '../views/match/Detail.vue'
import Create from '../views/match/Create.vue'
import MatchStyle from '../views/match/MatchStyle.vue'
import MathchEdit from '../views/match/MathchEdit.vue'
import PrizeAddress from '../views/match/PrizeAddress.vue'
import Share from '../views/match/Share.vue'
import WinnerList from '../views/match/WinnerList.vue'
import WaitingCheck from '../views/match/WaitingCheck.vue'
import GameRules from '../components/GameRules.vue'
import MatchRecord from '../views/match/MatchRecord.vue'
import PrizePreview from '../views/match/PrizePreview.vue'
import PrizeSetting from '../views/match/PrizeSetting.vue'
import AttendSetting from '../views/match/AttendSetting.vue'
import NumberInput from '../views/match/NumberInput.vue'
import AttendNumberInput from '../views/match/AttendNumberInput.vue'
import Comment from '../views/match/Comment.vue'
import Lnvitation from '../views/match/Invitation.vue'
import myPrize from '../views/match/myPrize.vue'
import Exchange from '../views/match/exchange'
import exchangeDetails from '../views/match/exchangeDetails'
import signUpNameList from '../views/match/signUpNameList'
import fans from '../views/match/fans'
import recollections from '../views/match/recollections'
import GamesList from "../views/match/GamesList.vue"
import MatchType from "../views/match/MatchType.vue"
import LoopType from "../views/match/create/LoopType.vue"

const MATCH_ROUTERS = [
  {
    path: '/match',
    component: Index,
    meta: {
      title: '广告主'
    }
  },
  {
    path: '/match/comment',
    component: Comment,
    meta: {
      title: '回复感言'
    }
  },
  {
    path: '/match/detail',
    component: Detail,
    meta: {
      title: '比赛详情'
    }
  },
  {
    path: '/match/create',
    component: Create,
    meta: {
      title: '创建比赛'
    }
  },
  {
    path: "/match/style/gameList",
    component: GamesList,
    meta: {
      title: "游戏列表"
    }
  },
  {
    path: "/match/style/matchType",
    component: MatchType,
    meta: {
      title: "比赛类型"
    }
  },
  {
    path: "/match/style/loopType",
    component: LoopType,
    meta: {
      title: "循环设置"
    }
  },
  {
    path: '/match/style',
    component: MatchStyle,
    meta: {
      title: '赛制设置'
    }
  },
  {
    path: '/match/edit',
    component: MathchEdit,
    meta: {
      title: '修改比赛信息'
    }
  },
  {
    path: '/match/style/prizepreview',
    component: PrizePreview,
    meta: {
      title: '填写奖品信息'
    }
  },
  {
    path: '/match/style/prizepreview/prizesetting',
    component: PrizeSetting,
    meta: {
      title: '填写奖品信息'
    }
  },
  {
    path: '/match/style/prizepreview/attendsetting',
    component: AttendSetting,
    meta: {
      title: '填写奖品信息'
    }
  },
  {
    path: '/match/style/prizepreview/prizesetting/numberInput',
    component: NumberInput,
    meta: {
      title: '选择名次范围'
    }
  },
  {
    path: '/match/style/prizepreview/prizesetting/attendNumberInput',
    component: AttendNumberInput,
    meta: {
      title: '选择奖品数量'
    }
  },
  {
    path: '/match/style/prize/address',
    component: PrizeAddress,
    meta: {
      title: '自提地址'
    }
  },
  {
    path: '/match/share',
    component: Share,
    meta: {
      title: '分享邀请码'
    }
  },
  {
    path: '/match/winner/list',
    component: WinnerList,
    meta: {
      title: '获奖列表'
    }
  },
  {
    path: '/match/waitingCheck',
    component: WaitingCheck,
    meta: {
      title: '待审核'
    }
  },
  {
    path: '/detail/gameRule',
    meta: {
      title: '游戏规则'
    },
    component: GameRules
  },
  {
    path: '/match/detail/record',
    meta: {
      title: '开赛记录'
    },
    component: MatchRecord
  },
  {
    path: '/match/detail/lnvitation',
    meta: {
      title: '邀请玩家'
    },
    component: Lnvitation
  },
  {
    path: '/match/detail/myPrize',
    meta: {
      title: '我的奖品库'
    },
    component: myPrize
  },
  {
    path: '/match/detail/exchange',
    meta: {
      title: '兑换'
    },
    component: Exchange
  },
  {
    path: '/match/detail/exchangeDetails',
    meta: {
      title: '兑换'
    },
    component: exchangeDetails
  },
  {
    path: '/match/detail/signUpNameList',
    meta: {
      title: '报名名单'
    },
    component: signUpNameList
  },
  {
    path: '/match/detail/fans',
    meta: {
      title: '粉丝'
    },
    component: fans
  },
  {
    path: '/match/detail/recollections',
    meta: {
      title: '感言'
    },
    component: recollections
  }
]

export default MATCH_ROUTERS
