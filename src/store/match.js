const match = {
  state: {
    id: '',
    time: 0,
    attendPerson: { id: 0, value: '未选择' }, //参加比赛的人数
    attendStyle: { id: -1, value: '未选择' }, //报名类型
    rankPrizes: [
      {
        beginRank: 1,
        endRank: 1,
        ispartInPrize: 0,
        prizes: [{ name: null, price: null, prizeCount: null, icon: null }]
      }
    ],
    partSet: [[{ name: null, price: null, prizeCount: null, icon: null }]],
    currentRankData: null,
    totalPrizes: null,
    rankPrize: [],
    sendStyle: '', //邮寄方式
    sendAddress: {},
    gameName: { id: 0, name: '未选择' }, //游戏名字
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
    setRankPrize(state, arr) {
      state.rankPrize = arr
    },
    setRankPrizes(state, arr) {
      state.rankPrizes = arr
    },
    setCurrentRankData(state, obj) {
      state.currentRankData = obj
    },
    setTotalPrizes(state, arr) {
      state.totalPrizes = arr
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
    setTime(state, time) {
      state.time = time
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
