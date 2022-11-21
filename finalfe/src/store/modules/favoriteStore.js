import { listHouse, deleteHouse } from "@/api/favorite";

const favoriteStore = {
    namespaced: true,
    state: {
        aparts: [],
        houses: [],
    },
    mutations: {
        SET_HOUSE_LIST(state, data) {
            state.houses = data;
        }
    },
    actions: {
        getHouseList: ({commit}, userid) => {
            listHouse(
                userid,
                ({ data }) => {
                    console.log(data);
                    commit("SET_HOUSE_LIST", data);
                },
                (error) => {
                    console.log(error);
                }
            )
        },
        removeFavoriteHouse: ({ commit }, houseid, userid) => {
            deleteHouse(
                houseid,
                ({ data }) => {
                    if (data === "success") {
                        this.getHouseList(userid);
                        commit();
                    } else {
                        console.log("error");
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    },
};

export default favoriteStore;