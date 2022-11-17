<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert style="background-color: rgba(94, 100, 114, 0.7)" show><h3>SIGN UP</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="id:" label-for="id">
              <b-form-input id="id" v-model="id" required placeholder="ID"></b-form-input>
            </b-form-group>
            <b-form-group label="password:" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="password"
                required
                placeholder="PASSWORD"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="name:" label-for="name">
              <b-form-input type="text" id="name" v-model="name" required placeholder="name"></b-form-input>
            </b-form-group>
            <b-form-group label="email:" label-for="email">
              <b-form-input type="email" id="email" v-model="email" required placeholder="email"></b-form-input>
            </b-form-group>
            <b-form-group label="age:" label-for="age">
              <b-form-input type="number" id="age" v-model="age" required placeholder="age"></b-form-input>
            </b-form-group>

            <b-button type="button" class="m-1" @click="regist">SIGN UP</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "UserRegister",
  data() {
    return {
      id: "",
      password: "",
      name: "",
      email: "",
      age: 0,
    };
  },
  methods: {
    regist() {
      if (this.id === "" || this.password === "" || this.name === "" || this.email === "") {
        alert("모든 내용을 입력해주세요");
        return;
      }

      let user = {
        id: this.id,
        password: this.password,
        name: this.name,
        email: this.email,
        age: this.age,
      };
      console.log(user, this);
      this.$store.dispatch("createUser", user);
    },
  },
};
</script>

<style></style>
