<template>
  <div class="sign-up">
    <p>회원가입</p>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button>가입하기</button>
    <router-link to="/userLogin">
      <span class="return-login">또는 로그인으로 돌아가기</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'signUp',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.sign-up {
  margin-top: 100px;
  margin-bottom: 100px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 30px;
  width: 10%;
  cursor: pointer;
}

p {
  margin-top: 30px;
  font-size: 20px;
  color: #538eca;
}

span.return-login {
  display: block;
  margin-top: 20px;
  font-size: 15px;
  color: #538eca;
  text-decoration: none; /* Remove underline */
}
</style>
