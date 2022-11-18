<template>
    <b-container class="bv-example-row mt-3">
        <b-row class="mb-1">
            <b-col class="text-left">
                <b-button variant="outline-primary" ><b-icon icon="list" font-scale="0.9"></b-icon></b-button>
            </b-col>
            <b-col class="text-right">
                <b-button variant="outline-info" size="sm"  class="mr-2" @click="moveModify"
                ><b-icon-pencil-square font-scale="1.2"></b-icon-pencil-square
                ></b-button>
            </b-col>
        </b-row>
        <div> id: {{ memberInfo.userid }} </div>
        <div> name: {{ memberInfo.username }} </div>
        <div> email: {{ memberInfo.email }} </div>
    </b-container>
</template>

<script>
import {mapState, mapActions} from "vuex";

const memberStore = "memberStore";

export default {
    name: "MemberInfo",
    data() {
        return {

        };
    },
    create() {
        let token = sessionStorage.getItem("access-token");
        this.getMemberInfo(token);
    },
    computed: {
        ...mapState(memberStore, ["memberInfo"]),
        ...mapActions(memberStore, ["getMemberInfo"]),
    },
    methods: {
        moveModify() {
            this.$router.push({name: "memberModify"});
        },
    },
}
</script>