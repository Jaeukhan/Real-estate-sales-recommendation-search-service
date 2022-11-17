import { getSidoCode, getGugunsCode, getApartList } from "@/api/map";

const mapStore = {
    namespaced: true, 
    state: {
        sidos: [{value: null, text:"시/도 선택"}],
        guguns: [{ value: null, text: "구/군 선택" }],
        aparts: [],
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
        SET_APART_LIST(state, aparts) {
            state.aparts = aparts;
        }
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
            )
        },
        getGugun: ({ commit }, sido) => {
            const param = {sido: sido}
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
                    commit("SET_APART_LIST", data.response.body.items.item);
                },
                (error) => {
                    console.log("Getting ApartList error: ", error)
                }
            )
        }
    },
};


export default mapStore;