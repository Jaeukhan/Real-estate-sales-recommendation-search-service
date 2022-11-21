import { getUserArticle } from "@/api/board";

const boardStore = {
  namespaced: true,
  state: {
    user_board: [],
  },
  mutations: {
    CLEAR_USER_BOARD(state) {
      state.user_board = [];
    },
    GET_USER_BOARD(state, info) {
      state.user_board = info;
    },
  },
  actions: {
    getUserBoard: ({ commit }, name) => {
      getUserArticle(
        name,
        ({ data }) => {
          // console.log("[[[[", data);
          commit("GET_USER_BOARD", data);
        },
        (error) => {
          console.log("Getting avgprice error: ", error);
        }
      );
    },
  },
};

export default boardStore;
