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
          <b-link to="/member" router-tag="b-nav-item">USER</b-link>
          <b-link to="/map" router-tag="b-nav-item">MAP</b-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">
        </b-navbar-nav> -->
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>