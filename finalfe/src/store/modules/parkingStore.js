import { getParkingList } from "@/api/parking";

const parkingStore = {
  namespaced: true,
  state: {
    price_li: [],
    price_name: [],
  },
  mutations: {
    GET_PARKING_LIST(state, info) {
      state.price_li = Object.values(info);
      state.price_li.shift();
      state.price_name = Object.keys(info);
      state.price_name.shift();
      // console.log("state", state.price_name);
    },
  },
  actions: {
    getParkingList: ({ commit }, param) => {
      getParkingList(
        param.sidoName.substr(0, 2),
        param.gugunName,

        ({ data }) => {
          // console.log("[[[[", data);
          commit("GET_PARKING_LIST", data);
        },
        (error) => {
          console.log("Getting avgprice error: ", error);
        }
      );
    },
  },
};

export default parkingStore;
