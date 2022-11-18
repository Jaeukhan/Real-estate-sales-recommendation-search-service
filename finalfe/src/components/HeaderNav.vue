<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      style="background-color: rgba(174, 217, 224, 0.7)"
    >
      <b-navbar-brand href="/">Where is my home?</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-link to="/" router-tag="b-nav-item">HOME</b-link>
            <b-link to="/board" router-tag="b-nav-item">BOARD</b-link>
            <b-link to="/map" router-tag="b-nav-item">MAP</b-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
          <!-- 로그인 전 nav bar -->
        <b-navbar-nav class="ml-auto" v-if="memberInfo">
          <b-nav-item>
            {{memberInfo.userid}} 님 환영합니다!
          </b-nav-item>
            <b-link to="/" router-tag="b-nav-item">MYPAGE</b-link>
            <b-nav-item @click.prevent="Logout">
              LOGOUT
            </b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
            <b-link to="/member" router-tag="b-nav-item">LOG IN</b-link>
            <b-link :to="{ name: 'memberRegister' }" router-tag="b-nav-item">SIGN UP</b-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";

const memberStore = "memberStore";

export default {
  name: "HeaderNav",
  data() {
    return{};
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "memberInfo"]),
    ...mapGetters(["checkMemberInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["memberLogout"]),
    Logout() {
      this.memberLogout(this.memberInfo.userid);
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      alert("로그아웃 되었습니다!");
      if(this.$route.path != "/") this.$router.push({name: "home"});
    },
  },
};
</script>

<style>
</style>