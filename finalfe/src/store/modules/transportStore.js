import { listBus } from "@/api/transport";
import { mapState } from "vuex";

const mapStore = "mapStore";
const transportStore = {
  namespaced: true,
  state: {
    prevSidoCode: null,
    busList: null,
  },
  mutations: {
    SET_BUS_LIST(state, payload) {
      // console.log("이거는 mutations payload이고: ",payload);
      state.busList = payload;
      // console.log(payload);
      // console.log("이거는 state buslist: ", state.busList);
      this.isReady = "bus";
    },
  },
  computed: {
    ...mapState(mapStore, ["isReady"]),
  },
  actions: {
    getBusList: ({ commit }, sidocode) => {
      listBus(
        sidocode,
        ({ data }) => {
          //   console.log("여기 transportStore.js: ", data);
          commit("SET_BUS_LIST", data);
        },
        (error) => {
          console.log("get listBus Error: ", error);
        }
      );
    },
  },
};

export default transportStore;