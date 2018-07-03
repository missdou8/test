const match = {
  state: {
    id: "",
    time: "",
    attendPerson: "",
    type: "",
    rankPrize: [],
    sendStyle: "",
    sendAddress: {},
    gameName: { id: 0, name: "未选择" },
    ifSave: false,
    detail: {}, //赛事信息：标题，封面和内容
    gainPrizeAddress: "" //自提地址
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
    setTitle(state, title) {
      state.title = title;
    },
    setDetail(state, detail) {
      state.detail = detail;
    },
    setgainPrizeAddress(state, gainPrizeAddress) {
      state.gainPrizeAddress = gainPrizeAddress;
    },
    setGameName(state, gameName) {
      state.gameName = gameName;
    }
  }
};

export default match;
