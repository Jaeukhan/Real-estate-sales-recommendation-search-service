<template>
  <div>
    <h3>지도</h3>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
    };
  },
  methods: {
    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=76f9cc9f657dbe8ff6bf3180b7a0f4db`;
      document.head.appendChild(script);
      /*global kakao*/
      script.addEventListener("load", () => {
        console.log("loaded", kakao);
      });
    } else {
      this.initMap();
    }
  },
};
</script>

<style scoped>
#map {
  width: 400px;
  height: 500px;
}
</style>
