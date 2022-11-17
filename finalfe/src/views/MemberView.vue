<template>
  <b-container class="bv-example-row mt-3 text-center">
<b-button variant="outline-secondary" @click="moveRegist" style="margin: 5px;">REGIST</b-button>

    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "MemberView",
  methods: {
    moveRegist() {
this.$router.push({ name: "memberRegister" });
    },
  },
};
</script>

<style>
</style>