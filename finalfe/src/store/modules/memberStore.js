import router from "@/router";
import { login, findById, tokenRegeneration, logout } from "@/api/member";
import jwtDecode from "jwt-decode";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    memberInfo: null,
    isValidToken: false,
  },
  getters: {
    checkMemberInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    // CREATE_USER: function (state, user) {
    //   state.users.push(user);
    // },
    // SET_LOGIN_USER: function (state, user) {
    //   state.loginUser = user;
    // },
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_MEMBER_INFO: (state, memberInfo) => {
      state.isLogin = true;
      state.memberInfo = memberInfo;
    },
  },
  actions: {
    // createUser: function ({ commit }, user) {
    //   commit("CREATE_USER", user);
    //   alert("회원가입이 완료되었습니다");
    //   router.push("/user");
    // },
    async memberConfirm({ commit }, member) {
      console.log("여기 memberConfrim: ", member);
      await login(
        member,
        ({ data }) => {
          console.log(data.message);
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];

            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);

            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log("login error: ", error);
        }
      );
    },
    async getMemberInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_MEMBER_INFO", data.memberInfo);
          } else {
            console.log("No Member Info");
          }
        },
        async (error) => {
          console.log("getMemberInfo error: Token expired", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      await tokenRegeneration(
        JSON.stringify(state.memberInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          if (error.response.status === 401) {
            await logout(
              state.memberInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("refreshToken delete success");
                } else {
                  console.log("refreshToken delete error");
                }
                alert("토큰 만료로 인해 로그아웃 합니다!");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log("logout error: ", error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async memberLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_MEMBER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("No Member Info");
          }
        },
        (error) => {
          console.log("logout error: ", error);
        }
      );
    },
  },
};

export default memberStore;
