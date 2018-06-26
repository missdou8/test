const match = {
  state: {
    id: "",
    time: "",
    attendPerson: "",
    type: "",
    rankPrize: [],
    sendStyle: "",
    sendAddress: "",
    ifSave: false,
    title: "",
    detail: ""
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
    }
  }
};

export default match;
