import { listAvgPrice } from "@/api/chart";

const chartStore = {
  namespaced: true,
  state: {
    price_li: [],
  },
  mutations: {
    GET_AVG_PRICE(state, info) {
      console.log("info", state.price_li, info);
    },
  },
  actions: {
    getAvgPrice: ({ commit }, name) => {
      listAvgPrice(
        name,
        ({ data }) => {
          console.log(commit, data);
          // commit("GET_AVG_PRICE", data.Kndrgrschoolstus[1].row);
        },
        (error) => {
          console.log("Getting avgprice error: ", error);
        }
      );
    },
  },
};

export default chartStore;
