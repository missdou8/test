const match = {
  state: {
    id: '',
    loop: {
      matchType: 2,
      beginTime: [0],
      type: 0,
      endTime: 0, //日内关闭时间
      inteval: 0, //间隔时间
      endDate: 0 //关闭日期
    },
    attendPerson: { templateId: 0, title: '请选择', templateType: 2, minPlayer: 0 }, //参加比赛的人数,type为2时是定点锦标赛，为3时为SNG比赛
    attendStyle: { id: -1, value: '请选择' }, //报名类型
    rankPrizes: [
      {
        beginRank: 1,
        endRank: 1,
        ispartInPrize: 0,
        prizes: [{ name: null, price: null, prizeCount: null, icon: null }]
      }
    ],
    partSet: [{ name: null, price: null, prizeCount: null, icon: null }],
    currentRankData: null,
    attendCurrentRankData: null,
    totalPrizes: null,
    attendTotalPrizes: null,
    sendStyle: '', //邮寄方式
    sendAddress: {},
    gameName: { id: 0, name: '请选择' }, //游戏名字
    ifSave: false,
    detail: {}, //赛事信息：标题，封面和内容
    gainPrizeAddress: '', //自提地址
    prizeCover: '',
    isEdit: false, //标记是否为编辑
    tabActive: 0
  },
  mutations: {
    setId(state, id) {
      state.id = id
    },
    setAttendPerson(state, num) {
      state.attendPerson = num
    },
    setRankPrizes(state, arr) {
      state.rankPrizes = arr
    },
    setCurrentRankData(state, obj) {
      state.currentRankData = obj
    },
    setAttendCurrentRankData(state, obj) {
      state.attendCurrentRankData = obj
    },
    setTotalPrizes(state, arr) {
      state.totalPrizes = arr
    },
    setAttendTotalPrizes(state, arr) {
      state.attendTotalPrizes = arr
    },
    setIfSave(state, bl) {
      state.ifSave = bl
    },
    setDetail(state, detail) {
      state.detail = detail
    },
    setgainPrizeAddress(state, gainPrizeAddress) {
      state.gainPrizeAddress = gainPrizeAddress
    },
    setGameName(state, gameName) {
      state.gameName = gameName
    },
    setLoop(state, loop) {
      state.loop = loop
    },
    setAttendStyle(state, style) {
      state.attendStyle = style
    },
    setPrizeCover(state, src) {
      state.prizeCover = src
    },
    setIsEdit(state, bl) {
      state.isEdit = bl
    },
    setSendStyle(state, type) {
      state.sendStyle = type
    },
    setTabActive(state, status) {
      state.tabActive = status
    },
    setPartSet(state, arr) {
      state.partSet = arr
    }
  }
}

export default match
