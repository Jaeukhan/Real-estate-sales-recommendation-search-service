import { getMartlist } from "@/api/mart";
import { mapState } from "vuex";

const mapStore = "mapStore";
const martStore = {
  namespaced: true,
  state: {
    market_li: [],
  },
  mutations: {
    SET_MART_LIST(state, info) {
      let li = [];
      for (let d = 0; d < info.length; d++) {
        let temp = {
          lat: info[d].REFINE_WGS84_LAT, //위도
          long: info[d].REFINE_WGS84_LOGT, //경도
          name: info[d].MARKET_NM, //마켓 이름
          address: info[d].REFINE_ROADNM_ADDR, //마트 주소
        };
        li.push(temp);
      }
      state.market_li = li;
      // console.log("mut", state.market_li);
      // console.log("state", state.price_name);
      console.log("마트스토어");
      this.isReady = "mart";
    },
  },
  computed: {
    ...mapState(mapStore, ["isReady"]),
  },
  actions: {
    getMart: ({ commit }, param) => {
      getMartlist(
        param.siGunCode,
        param.siGunName,
        ({ data }) => {
            console.log("[[[[mart", data);
          //   console.log("[[[[", data.ParkingPlace[1].row);
          commit("SET_MART_LIST", data.MrktStoreM[1].row);
        },
        (error) => {
          console.log("Getting Mart_LIST error: ", error);
        }
      );
    },
  },
};

export default martStore;
