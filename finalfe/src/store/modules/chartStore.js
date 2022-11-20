import { listAvgPrice } from "@/api/chart";

const chartStore = {
  namespaced: true,
  state: {
    price_li: [],
  },
  mutations: {
    GET_AVG_PRICE(state, info) {
      state.price_li = info;
      // console.log("state", state.price_li);
    },
  },
  actions: {
    getAvgPrice: ({ commit }, param) => {
      listAvgPrice(
        param.sido.substr(0, 2),
        param.gugun,
        ({ data }) => {
          commit("GET_AVG_PRICE", data[0]);
        },
        (error) => {
          console.log("Getting avgprice error: ", error);
        }
      );
    },
  },
};

export default chartStore;
