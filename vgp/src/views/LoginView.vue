<template>
  <div class="userLogin">
    <h3>Login</h3>
    <input type="text" placeholder="email"><br>
    <input type="password" placeholder="password"><br>
    <button>로그인</button>
    <router-link to="/signup">
      <button class="signup-button">회원가입</button>
    </router-link>
    <p>만약 계정이 없다면, 회원가입을 먼저 진행해주세요!</p>
  </div>
</template>

<script>
export default {
  name: 'userLogin',
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.userLogin {
  margin-top: 100px;
  margin-bottom: 100px; /* Add margin-bottom to move the content downward */
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

.signup-button {
  margin-left: 30px;
}

p {
  margin-top: 30px;
  font-size: 15px;
  color: #538eca;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

h3 {
  color: #538eca;
}
</style>
