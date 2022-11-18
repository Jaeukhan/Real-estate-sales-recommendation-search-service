import { getSidoCode, getGugunsCode, getApartList } from "@/api/map";

const mapStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "시/도 선택" }],
    guguns: [{ value: null, text: "구/군 선택" }],
    aparts: [],
    apt: {}, //아파트 주소랑(load), 아파트 이름(aptName)
    sidoName: "",
    gugunName: "",
  },
  getters: {},
  mutations: {
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_APT_LIST(state) {
      state.aparts = [];
    },
    CLEAR_APT(state) {
      state.apt = {};
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_APART_LIST(state, info) {
      state.aparts = info.aparts;
      state.sidoName = info.sidoName;
      state.gugunName = info.gugunName;
    },
    GET_APT_ONE(state, info) {
      state.apt = {
        load: state.sidoName + " " + state.gugunName + " " + info.load,
        aptName: info.aptName,
      };
      console.log(state.apt.aptName);
    },
  },
  actions: {
    getSido: ({ commit }) => {
      getSidoCode(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log("Getting sidoCode error: ", error);
        }
      );
    },
    getGugun: ({ commit }, sido) => {
      const param = { sido: sido };
      getGugunsCode(
        param,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log("Getting gugunCode error: ", error);
        }
      );
    },
    getApt: ({ commit }, condition) => {
      const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
      const param = {
        serviceKey: decodeURIComponent(SERVICE_KEY),
      };
      const gCode = condition.gugun;
      const date = condition.date;
      getApartList(
        param,
        gCode,
        date,
        ({ data }) => {
          const info = {
            aparts: data.response.body.items.item,
            sidoName: condition.sidoName,
            gugunName: condition.gugunName,
          };
          commit("SET_APART_LIST", info);
        },
        (error) => {
          console.log("Getting ApartList error: ", error);
        }
      );
    },
    getAptOne: ({ commit }, apt) => {
      const data = {
        load: apt.도로명,
        aptName: apt.아파트,
      };
      commit("GET_APT_ONE", data);
    },
  },
};

export default mapStore;
