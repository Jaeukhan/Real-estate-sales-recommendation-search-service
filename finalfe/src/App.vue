<template>
  <div id="app">
    <header-nav></header-nav>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import HeaderNav from "@/components/HeaderNav.vue";

export default {
  components: {
    HeaderNav,
  },
};
</script>
<style>
#app {
  background: url("@/assets/hero_bg.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.container {
  min-height: 100vh;
}
</style>
