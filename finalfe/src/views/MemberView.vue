<template>
  <b-container class="bv-example-row mt-3 text-center">
<b-button variant="outline-secondary" @click="moveLogin" style="margin: 5px;">LOGIN</b-button>
<b-button variant="outline-secondary" @click="moveRegist" style="margin: 5px;">REGIST</b-button>

    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "UserView",
  methods: {
    moveLogin() {
this.$router.push({ name: "userLogin" });
    },
    moveRegist() {
this.$router.push({ name: "userRegister" });
    },
  },
};
</script>

<style>
</style>