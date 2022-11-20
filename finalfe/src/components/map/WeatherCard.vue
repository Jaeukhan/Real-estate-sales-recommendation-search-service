<template>
    <div id="wcard">
        <b-card>
            <b-card-text>
                {{info.name}}
                현재기온: {{info.temp}} 도
                최저기온: {{info.min_temp}} 도
                최고기온: {{info.max_temp}} 도
                날씨: {{info.weather}}
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import {mapState} from "vuex";

const mapStore = "mapStore";

export default {
    data() {
        return { 
        };
    },
    computed: {
        ...mapState(mapStore, ["weatherLoc", "info"]),
    },
    
}
</script>

<style>
/* #wcard {
    background-image: url('../../assets/cloud.jpeg');
} */
</style>