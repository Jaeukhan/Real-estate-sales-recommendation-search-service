import router from "@/router";
import jwtDecode from "jwt-decode";

const memberStore = {
  namespaced: true,
  state: {
    users: [],
    user: null,
    loginUser: null,
    ////////// 로그인 token
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {},
  mutations: {
    CREATE_USER: function (state, user) {
      state.users.push(user);
    },
    SET_LOGIN_USER: function (state, user) {
      state.loginUser = user;
    },
  },
  actions: {
    createUser: function ({ commit }, user) {
      commit("CREATE_USER", user);
      alert("회원가입이 완료되었습니다");
      router.push("/user");
    },
    setLoginUser: function ({ commit, state }, user) {
      let islogin = false;

      for (let i = 0; i < state.users.length; i++) {
        // console.log(state.users.length);
        if (user.id === state.users[i].id && user.password === state.users[i].password) {
          islogin = true;
          break;
        }
      }
      if (islogin) {
        commit("SET_LOGIN_USER", user);
        alert("로그인 성공!");
        router.push("/");
      } else {
        alert("로그인 실패! 아이디/비밀번호를 확인하세요");
      }
    },
  },
};

export default memberStore;
