<template>
  <div align-v="center" align-h="center" style="text-align: center">
    <h3 v-if="apt">{{ apt.aptName }}</h3>
    <div id="map" style="margin-right: 0" align-h="center"></div>
    <b-button class="mt-3" @click="getParkinglot">주변 주차장 검색</b-button>
    <b-button class="mt-3" @click="getLibloc">주변 도서관 검색</b-button>
    <b-button class="mt-3" @click="getMartloc">주변 시장 및 마트 검색</b-button>
    <!-- <b-button class="mt-3" @click="getBusStopList">근처 버스 정류장 찾기(일단 서울)</b-button> -->
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

const mapStore = "mapStore";
const parkingStore = "parkingStore";
const transportStore = "transportStore";
const libraryStore = "libraryStore";
const martStore = "martStore";

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      geocoder: null,
      markers: [], //매물 마커 담을 배열
      inframarkers: [], //인프라 마커 담을 배열
      infowindow: null,
      markerPositions1: [
        [33.452278, 126.567803],
        [33.452671, 126.574792],
        [33.451744, 126.572441],
      ],
      aptAddr: "",
      temp: { lat: null, lon: null },
      imageSrc: {},
      markerImage: null,
      imageSize: null,
      tempLoc: {
        x: "",
        y: "",
      },
      circle: null,
      totalCoordinate: [],
      drawLine: null,
    };
  },
  props: ["cup"],
  created() {
    this.CLEAR_APT();
    this.cup.$on("move", this.searchSubmit);
  },
  computed: {
    ...mapState(mapStore, ["apt", "selectedsch", "aparts", "sidoName", "gugunName", "weatherLoc", "isReady"]), //apt.load, apt.
    ...mapState(parkingStore, ["parking_li"]),
    ...mapState(transportStore, ["busList"]),
    ...mapState(libraryStore, ["lib_li"]),
    ...mapState(martStore, ["market_li"]),
  },
  watch: {
    market_li(val) {
      const positions = [];
      for (let i = 0; i < val.length; i++) {
        const d = {
          title: val[i].name,
          latlng: new kakao.maps.LatLng(val[i].lat, val[i].long),
          markname: "mart",
        };
        positions.push(d);
      }
      // console.log(positions);
      this.displayMarker(positions);
    },
    lib_li(val) {
      const positions = [];
      for (let i = 0; i < val.length; i++) {
        const d = {
          title: val[i].name,
          latlng: new kakao.maps.LatLng(val[i].lat, val[i].long),
          markname: "library",
        };
        positions.push(d);
      }
      // console.log(positions);
      this.displayMarker(positions);
    },
    parking_li(val) {
      const positions = [];
      for (let i = 0; i < val.length; i++) {
        const d = {
          title: val[i].name,
          latlng: new kakao.maps.LatLng(val[i].lat, val[i].long),
          markname: "parking",
        };
        positions.push(d);
      }
      this.displayMarker(positions);
    },
    busList(val) {
      const positions = [];
      for (let i = 0; i < val.length; i++) {
        const d = {
          title: val[i].stopname,
          latlng: new kakao.maps.LatLng(val[i].lat, val[i].lon),
          markname: "bus",
        };
        positions.push(d);
      }
      this.displayMarker(positions);
    },
    selectedsch(val) {
      this.displayMarkerAndMove(val);
    },
    apt(val) {
      if (val.load) {
        this.searchSubmit(val.load);
        // this.displayMarkerAndMove(val.REFINE_ROADNM_ADDR);
        // this.weatherLoc.lat = this.temp.lat;
        // this.weatherLoc.lon = this.temp.lon;
        this.setWeatherLoc(this.temp);
        this.apiload(this.temp);
        // console.log("찐으로 바꾼거:", this.temp);
      }
    },
    aparts(val) {
      if (val) {
        let li = [];
        for (let i = 0; i < val.length; i++) {
          const names = this.sidoName + " " + this.gugunName + " " + val[i].법정동 + " " + val[i].도로명;
          li.push({
            REFINE_ROADNM_ADDR: names,
            title: val[i].아파트,
            markname: "apart",
          });
        }
        this.displayMarkerAndMove(li);
      } else {
        alert("서비스 지역이 아닙니다.");
      }
    },
  },
  methods: {
    ...mapActions(mapStore, ["setWeatherLoc", "apiload"]),
    ...mapActions(parkingStore, ["getParking"]),
    ...mapActions(transportStore, ["getBusList"]),
    ...mapActions(libraryStore, ["getLibrary"]), //libraryStore
    ...mapActions(martStore, ["getMart"]), //libraryStore

    ...mapMutations(mapStore, ["CLEAR_APT"]),

    initMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);
      this.geocoder = new kakao.maps.services.Geocoder();
      this.imageSize = new kakao.maps.Size(30, 30);
      this.imageSrc.kindergarden = require("@/assets/kakaomap/kindergarden.png");
      this.imageSrc.element = require("@/assets/kakaomap/element.png");
      this.imageSrc.middle = require("@/assets/kakaomap/middle.png");
      this.imageSrc.high = require("@/assets/kakaomap/high.png");
      this.imageSrc.apart = require("@/assets/kakaomap/apart.png");
      this.imageSrc.buststop = require("@/assets/kakaomap/buststop.png");
      this.imageSrc.library = require("@/assets/kakaomap/library.png");
      this.imageSrc.parking = require("@/assets/kakaomap/parking.png");
      this.imageSrc.mart = require("@/assets/kakaomap/mart.png");
      this.addEventToMap();
    },
    displayMarkerAndMove(Addr) {
      let positions = [];
      // console.log(Addr);
      if (Addr)
        for (let n = 0; n < Addr.length; n++) {
          this.geocoder.addressSearch(Addr[n].REFINE_ROADNM_ADDR, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              // let bounds = new kakao.maps.LatLngBounds();
              for (let i = 0; i < result.length; i++) {
                let data = result[i];
                const d = {
                  title: Addr[n].title,
                  latlng: new kakao.maps.LatLng(data.y, data.x),
                  markname: Addr[0].markname,
                };
                positions.push(d);
                this.displayMarkerApart(positions);
                // bounds.extend(new kakao.maps.LatLng(data.y, data.x));
              }
            }
          });
        }
    },
    displayMarker(positions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      console.log(positions[0].markname);
      if (positions[0].markname == "bus") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.buststop, this.imageSize);
      } else if (positions[0].markname == "apart") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.apart, this.imageSize);
      } else if (positions[0].markname == "parking") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.parking, this.imageSize);
      } else if (positions[0].markname == "library") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.library, this.imageSize);
      } else if (positions[0].markname == "high") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.high, this.imageSize);
      } else if (positions[0].markname == "middle") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.middle, this.imageSize);
      } else if (positions[0].markname == "element") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.element, this.imageSize);
      } else if (positions[0].markname == "kindergarden") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.kindergarden, this.imageSize);
      } else {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.mart, this.imageSize);
      }

      positions.forEach((position) => {
        const coords = new kakao.maps.LatLng(this.tempLoc.y, this.tempLoc.x);
        let line = new kakao.maps.Polyline();
        let path = [position.latlng, coords];
        line.setPath(path);
        let dist = line.getLength();
        const radius = 400;
        if (radius > dist) {
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: position.latlng,
            title: position.title,
            clickable: true,
            image: this.markerImage,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div>${position.title}</div>`,
          });
          let _this = this;
          kakao.maps.event.addListener(marker, "mouseover", function () {
            // console.log("마커 이벤트!");
            // console.log(position.latlng);
            infowindow.open(_this.map, marker);
          });
          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          this.markers.push(marker);
        }
      });
      // const bounds = this.tempLoc; //       console.log("선택한 아파트 매물 위치 주변으로 boudning", bounds);
      this.clustererAddMark();
      // this.map.setCenter(new kakao.maps.LatLng(bounds.qa, bounds.oa));
      // this.map.setBounds(bounds);
    },
    displayMarkerApart(positions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      console.log(positions[0].markname);
      if (positions[0].markname == "bus") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.buststop, this.imageSize);
      } else if (positions[0].markname == "apart") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.apart, this.imageSize);
      } else if (positions[0].markname == "parking") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.parking, this.imageSize);
      } else if (positions[0].markname == "library") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.library, this.imageSize);
      } else if (positions[0].markname == "high") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.high, this.imageSize);
      } else if (positions[0].markname == "middle") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.middle, this.imageSize);
      } else if (positions[0].markname == "element") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.element, this.imageSize);
      } else if (positions[0].markname == "kindergarden") {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.kindergarden, this.imageSize);
      } else {
        this.markerImage = new kakao.maps.MarkerImage(this.imageSrc.mart, this.imageSize);
      }

      positions.forEach((position) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: position.latlng,
          title: position.title,
          clickable: true,
          image: this.markerImage,
        });
        const infowindow = new kakao.maps.InfoWindow({
          content: `<div>${position.title}</div>`,
        });
        let _this = this;
        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(_this.map, marker);
        });
        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });

        this.markers.push(marker);
      });
      const bounds = positions.reduce(
        (bounds, position) => bounds.extend(position.latlng),
        new kakao.maps.LatLngBounds()
      );
      this.map.setBounds(bounds);
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(this.loc.x, this.loc.y), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
    // movelocation() {
    //   this.aptAddr = this.apt.load;
    //   this.searchSubmit+_+(this.aptAddr);
    // },
    clustererAddMark() {
      if (this.circle) {
        this.circle.setMap(null);
      }
      const coords = new kakao.maps.LatLng(this.tempLoc.y, this.tempLoc.x);
      this.map.setCenter(coords);
      this.circle = new kakao.maps.Circle({
        map: this.map,
        center: coords,
        radius: 400, // m단위
        strokeWeight: 2,
        strokeColor: "#FF00FF",
        strokeOpacity: 0.8,
        strokeStyle: "dashed",
        fillColor: "#00EEEE",
        fillOpacity: 0.1,
      });
      // let center = this.circle.getPosition();
      // let radius = this.circle.getRadius();
      // let line = new kakao.maps.Polyline();
      // console.log(this.totalCoordinate);

      // this.totalCoordinate.forEach(function (marker) {
      //   console.log("마커마커", marker.n);
      //   // 마커의 위치와 원의 중심을 경로로 하는 폴리라인 설정
      //   console.log("센터", center);
      //   console.log("마커마커", marker);
      //   console;
      //   var path = [marker.n, center];
      //   line.setPath(path);
      //   console.log("라인", path);
      //   // 마커와 원의 중심 사이의 거리

      //   // this.drawLine = new kakao.maps.Polyline({
      //   //   map: this.map, // 선을 표시할 지도입니다
      //   //   path: path,
      //   //   strokeWeight: 3, // 선의 두께입니다
      //   //   strokeColor: "#db4040", // 선의 색깔입니다
      //   //   strokeOpacity: 0.5, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
      //   //   strokeStyle: "solid", // 선의 스타일입니다
      //   // });

      //   var dist = line.getLength();
      //   console.log("dist", dist);

      //   // 이 거리가 원의 반지름보다 작거나 같다면
      //   if (dist < radius) {
      //     // 해당 marker는 원 안에 있는 것
      //     marker.setMap(this.map);
      //   } else {
      //     marker.setMap(null);
      //   }
      //   // this.drawLine.setMap(this.map);
      // });
    },
    searchSubmit(Addr) {
      this.geocoder.addressSearch(Addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();
          // let datas = result[0];
          // bounds.extend(new kakao.maps.LatLng(datas.y, datas.x));
          let datas = [];
          for (let i = 0; i < result.length; i++) {
            let data = result[i];
            datas.push([data.y, data.x]);
            this.tempLoc.x = data.x;
            this.tempLoc.y = data.y;
            bounds.extend(new kakao.maps.LatLng(data.y, data.x));
          }
          console.log("loc 찍음", this.tempLoc);
          this.map.setBounds(bounds);
        }
      });
    },
    addEventToMap() {
      let _this = this;
      kakao.maps.event.addListener(_this.map, "center_changed", function () {
        let latlng = _this.map.getCenter();
        _this.temp.lat = latlng.Ma;
        _this.temp.lon = latlng.La;
      });
    },
    ////// 주차장
    getParkinglot() {
      const param = {
        siGunName: "시흥시",
        siGunCode: "41390",
      };
      this.getParking(param);
    },
    getLibloc() {
      const param = {
        siGunName: "시흥시",
        siGunCode: "41390",
      };
      this.getLibrary(param);
    },
    getMartloc() {
      const param = {
        siGunName: "시흥시",
        siGunCode: "41390",
      };
      this.getMart(param);
    },
    getBusStopList() {
      this.getBusList(11);
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
