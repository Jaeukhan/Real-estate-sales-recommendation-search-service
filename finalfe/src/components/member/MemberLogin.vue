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
                v-model="id"
                required
                placeholder="id"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="PASSWORD" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="password"
                @keyup.enter="login"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              class="m-1"
              @click="login"
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
export default {
  name: "UserLogin",
  data() {
    return {
      id: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.id === "" || this.password === "") {
        alert("아이디 또는 비밀번호를 확인하세요");
        return;
      }

      let user = {
        id: this.id,
        password: this.password,
      };
      this.$store.dispatch("setLoginUser", user);
    },
    movePage() {
      this.$router.push({ name: "userRegister" });
    },
  },
};
</script>

<style></style>
