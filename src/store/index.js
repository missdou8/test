import Vue from "vue";
import Vuex from "vuex";
import match from "./match.js";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});

export default new Vuex.Store({
  modules: {
    match
  },
  plugins: [vuexLocal.plugin]
});
