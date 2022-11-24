<template>
  <div id="root">
    <div id="container">
      <div id="contacts">
        <div id="contacts--contact">
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <a href="/" id="navItem" style="font-size: 23px; floa t: right">Where Is My HOME? </a>
        </div>
        <div id="contacts--social">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
#container {
  padding-top: 20px;
  margin-top: 20px;
  width: 100vw;
  color: rgb(53, 46, 17);
  background-color: #918c80;
}
#contacts {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
}
#contacts--contact {
  text-align: right;
}
#contacts--social {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
#contacts--social div {
  height: 30px;
  width: 30px;
  background-color: rgb(93, 81, 30);
  border-radius: 50%;
}
</style>
