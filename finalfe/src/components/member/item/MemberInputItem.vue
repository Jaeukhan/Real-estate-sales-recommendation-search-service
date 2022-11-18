<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert style="background-color: rgba(94, 100, 114, 0.7)" show><h3>SIGN UP</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form @submit="onSubmit" class="text-left">
            <b-form-group label="id:" label-for="id">
              <b-form-input id="id" v-model="member.id" required placeholder="ID" :disabled="isModify"></b-form-input>
            </b-form-group>
            <b-form-group label="name:" label-for="name">
              <b-form-input type="text" id="name" v-model="member.name" required placeholder="name"></b-form-input>
            </b-form-group>
            <b-form-group label="password:" label-for="password">
              <b-form-input
                type="password"
                id="password"
                v-model="member.password"
                required
                placeholder="PASSWORD"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="email:" label-for="email">
              <b-form-input type="email" id="email" v-model="member.email" required placeholder="email"></b-form-input>
            </b-form-group>

            <b-button type="submit" class="m-1" v-if="this.type === 'regist'">SIGN UP</b-button>
            <b-button type="submit" class="m-1" v-else>MODIFY</b-button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import {regist, modify} from "@/api/member";
import {mapState} from "vuex";

const memberStore = "memberStore";

export default {
  name: "MemberInputItem",
  data() {
    return {
      member: {
        id: "",
        password: "",
        name: "",
        email: "",
      },
      isModify: false,
    };
  },
  props: {
    type: {type: String},
  },
  created() {
    if(this.type === "modify") {
      this.member.id = this.memberInfo.userid;
      this.member.name = this.memberInfo.username;
      this.member.email = this.memberInfo.email;
      this.isModify = true;
    }
  },
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
  },
  methods: {
      onSubmit(event) {
        event.preventDefault();
        
        if (this.id === "" || this.password === "" || this.name === "" || this.email === "") {
          alert("모든 내용을 입력해주세요");
          return;
        }
        else this.type === "regist" ? this.memberRegist() : this.memberModify();
      },
      memberRegist() {
        let param = {
          userid: this.member.id,
          userpwd: this.member.password,
          username: this.member.name,
          email: this.member.email,
        };
        regist(
          param, 
          ({data}) => {
            if(data === "success") {
              alert("회원가입이 완료되었습니다.");
            } else {
              alert("회원가입 오류!");
            }
            this.$router.push({name: "member"});
          },
        );
      },
      memberModify() {
        let param = {
          userid: this.member.id,
          userpwd: this.member.password,
          username: this.member.name,
          email: this.member.email,
        };
        modify(
          param, 
          ({data}) => {
            if(data==="success") {
              alert("회원 정보 수정 왼료!");
            } else {
              alert("회원 정보 수정 오류..");
            }
            this.$router.push({name: "memberInfo"});
          }
        )
        }
      },
};
</script>

<style></style>
