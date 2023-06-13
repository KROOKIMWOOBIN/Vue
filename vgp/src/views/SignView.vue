<template>
    <div class="box">
      <div class="id">
        <b>아이디</b><br>
        <span class="placehold-text"><input type="text" v-model="id"></span>
      </div>
      <div class="pass">
        <b>비밀번호</b><br>
        <input class="userpw" type="password" v-model="password">
      </div>
      <div class="passretry">
        <b>비밀번호 재확인</b><br>
        <input class="userpw-confirm" type="password" v-model="confirmPassword">
      </div>
      <div class="name">
        <b>이름</b><br>
        <input type="text" v-model="name">
      </div>
  
      <!-- 3. 필드(생년월일) -->
      <div class="birth">
        <b>생년월일</b>
        <div>
          <input type="number" placeholder="년(4자)" v-model="year">
          <select v-model="month">
            <option value="">월</option>
            <option value="1">1월</option>
            <option value="2">2월</option>
            <option value="3">3월</option>
            <option value="4">4월</option>
            <option value="5">5월</option>
            <option value="6">6월</option>
            <option value="7">7월</option>
            <option value="8">8월</option>
            <option value="9">9월</option>
            <option value="10">10월</option>
            <option value="11">11월</option>
            <option value="12">12월</option>
          </select>
          <input type="number" placeholder="일" v-model="day">
        </div>
      </div>
  
      <!-- 4. 필드(성별) -->
      <div class="field gender">
        <b>성별</b>
        <div>
          <label><input type="radio" name="gender" value="남자" v-model="gender">남자</label>
          <label><input type="radio" name="gender" value="여자" v-model="gender">여자</label>
          <label><input type="radio" name="gender" value="선택안함" v-model="gender">선택안함</label>
        </div>
      </div>
      <input type="submit" value="가입하기" @click="signUp">
    </div>
  </template>
  
  <style>
  @import "@/assets/Sign.css";
  </style>
  
  <script>
  export default {
    data() {
      return {
        id: "",
        password: "",
        confirmPassword: "",
        name: "",
        year: "",
        month: "",
        day: "",
        gender: ""
      };
    },
    methods: {
      signUp() {
        // 필수 입력 항목 확인
        if (
          this.id === "" ||
          this.password === "" ||
          this.confirmPassword === "" ||
          this.name === "" ||
          this.year === "" ||
          this.month === "" ||
          this.day === "" ||
          this.gender === ""
        ) {
          window.alert("빈칸을 모두 입력해주세요.");
          return; 
        }
  
        window.alert("가입 완료");
        this.id = "";
        this.password = "";
        this.confirmPassword = "";
        this.name = "";
        this.year = "";
        this.month = "";
        this.day = "";
        this.gender = "";
      }
    }
  };
  </script>
  