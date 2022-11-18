<template>
  <div align-v="center" align-h="center" style="text-align: center">
    <h3 v-if="apt">{{ apt.aptName }}</h3>
    <div id="map" style="margin-right: 0" align-h="center"></div>
    <b-button @click="movelocation()">매물로 이동</b-button>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

const mapStore = "mapStore";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      geocoder: null,
      markers: [],
      infowindow: null,
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      aptAddr: "",
    };
  },
  created() {
    this.CLEAR_APT();
  },
  computed: {
    ...mapState(mapStore, ["apt"]), //apt.load, apt.
  },
  methods: {
    ...mapMutations(mapStore, ["CLEAR_APT"]),
    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.geocoder = new kakao.maps.services.Geocoder();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map((position) => new kakao.maps.LatLng(...position));

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce((bounds, latlng) => bounds.extend(latlng), new kakao.maps.LatLngBounds());

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
    setCenter(lat, lon) {
      let moveLatLon = new kakao.maps.LatLng(lat, lon);
      // 지도 중심을 이동 시킵니다
      this.map.setCenter(moveLatLon);
    },
    movelocation() {
      console.log(this.apt.load);
      this.aptAddr = this.apt.load;
      console.log("x");
      this.searchSubmit();
    },

    searchSubmit() {
      console.log("1");
      console.log(this.aptAddr);
      this.geocoder.addressSearch(this.aptAddr, (result, status) => {
        console.log("2");
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < result.length; i++) {
            let data = result[i];
            bounds.extend(new kakao.maps.LatLng(data.y, data.x));
          }

          this.map.setBounds(bounds);
        }
      });
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /*global kakao*/
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=76f9cc9f657dbe8ff6bf3180b7a0f4db&libraries=services`;
      document.head.appendChild(script);
    }
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
