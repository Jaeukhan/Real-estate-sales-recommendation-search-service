import { listAvgPrice } from "@/api/chart";

const chartStore = {
  namespaced: true,
  state: {
    price_li: [],
    price_name: [],
  },
  mutations: {
    GET_AVG_PRICE(state, info) {
      state.price_li = Object.values(info);
      state.price_li.shift();
      state.price_name = Object.keys(info);
      state.price_name.shift();
      // console.log("state", state.price_name);
    },
  },
  actions: {
    getAvgPrice: ({ commit }, param) => {
      listAvgPrice(
        param.sidoName.substr(0, 2),
        param.gugunName,

        ({ data }) => {
          // console.log("[[[[", data);
          commit("GET_AVG_PRICE", data);
        },
        (error) => {
          console.log("Getting avgprice error: ", error);
        }
      );
    },
  },
};

export default chartStore;
