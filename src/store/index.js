import Vue from "vue";
import Vuex from "vuex";
import boards from "./modules/boards.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    boards,
  },
});
