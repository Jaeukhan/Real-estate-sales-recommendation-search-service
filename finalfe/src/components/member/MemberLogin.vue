<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert style="background-color: rgba(255, 166, 158, 0.6)" show
          ><h3>SIGN IN</h3></b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="ID" label-for="id">
              <b-form-input
                id="id"
                v-model="user.id"
                required
                placeholder="id"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="PASSWORD" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="user.password"
                required
                placeholder="password"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              class="m-1"
              @click="confirm"
              style="background-color: rgba(250, 243, 221, 0.6); color: black"
              >SIGN IN</b-button
            >
            <b-button
              type="button"
              class="m-1"
              @click="movePage"
              style="background-color: rgba(250, 243, 221, 0.6); color: black"
              >SIGN UP</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import {mapState, mapActions} from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberLogin",
  data() {
    return {
      user: {
        id: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "memberInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["memberConfirm", "getMemberInfo"]),
    async confirm() {
      console.log("버튼 눌림!!!");
      await this.memberConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log("토큰 가져옴", token);
      if(this.isLogin) {
        await this.getMemberInfo(token);
        console.log("로그인 성공!");
        this.$router.push({name: "home"});
      }
    },
    movePage() {
      this.$router.push({name: "memberRegister"});
    },
  },
};
</script>

<style></style>
