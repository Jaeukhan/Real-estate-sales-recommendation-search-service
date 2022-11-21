import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import memberStore from "@/store/modules/memberStore";
import mapStore from "@/store/modules/mapStore";
import chartStore from "@/store/modules/chartStore";
import favoriteStore from "@/store/modules/favoriteStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    memberStore,
    mapStore,
    chartStore,
    favoriteStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
