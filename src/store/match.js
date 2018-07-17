const match = {
  state: {
    id: "",
    time: "",
    attendPerson: { id: 0, value: "未选择" }, //参加比赛的人数
    attendStyle: { id: 0, value: "未选择" }, //报名类型
    rankPrize: [],
    sendStyle: "", //邮寄方式
    sendAddress: {},
    gameName: { id: 0, name: "未选择" }, //游戏名字
    ifSave: false,
    detail: {}, //赛事信息：标题，封面和内容
    gainPrizeAddress: "", //自提地址
    prizeCover: "",
    isEdit: false, //标记是否为编辑
    tabActive: 0,
    shareImgFile: ""
  },
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    setAttendPerson(state, num) {
      state.attendPerson = num;
    },
    setRankPrize(state, arr) {
      state.rankPrize = arr;
    },
    setIfSave(state, bl) {
      state.ifSave = bl;
    },
    setDetail(state, detail) {
      state.detail = detail;
    },
    setgainPrizeAddress(state, gainPrizeAddress) {
      state.gainPrizeAddress = gainPrizeAddress;
    },
    setGameName(state, gameName) {
      state.gameName = gameName;
    },
    setTime(state, time) {
      state.time = time;
    },
    setAttendStyle(state, style) {
      state.attendStyle = style;
    },
    setPrizeCover(state, src) {
      state.prizeCover = src;
    },
    setIsEdit(state, bl) {
      state.isEdit = bl;
    },
    setSendStyle(state, type) {
      state.sendStyle = type;
    },
    setTabActive(state, status) {
      state.tabActive = status;
    },
    setShareImgFile(state, file) {
      state.shareImgFile = file;
    }
  }
};

export default match;
