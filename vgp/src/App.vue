<template>
  <div>
    <nav class="sticky-nav">
      <router-link to="/">
        <h1 class="game_title">FPS</h1>
      </router-link>
      <router-link to="/" exact>홈</router-link>
      <span class="separator">|</span>
      <router-link to="/about">커뮤니티</router-link>
    </nav>
    <router-view />
    <footer class="footer">
      <p>Created by Kim Woo-bin</p>
      <p>Email: woodol4540@naver.com</p>
      <button class="upbtn" @click="scrollToTop">UP</button>
    </footer>
  </div><br><br><br><br><br>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      let intervalId = setInterval(() => {
        let position = window.pageYOffset;
        if (position > 0) {
          window.scrollTo(0, position - position / 10);
        } else {
          clearInterval(intervalId);
        }
      }, 10);
    },
  },
};
</script>

<style>
.upbtn {
  float: right;
  margin-right: 1cm;
  background-color: rgb(46, 66, 180);
  border: none;
  padding: 0.2cm;
  border-radius: 10px;
  animation-delay: 0;
  animation-duration: 1s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #538eca;
  margin-top: 50px;
}

.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 75px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 999;
  background-color: #101f3a;
}

nav a {
  font-weight: bold;
  color: #538eca;
  text-decoration: none;
}

.game_title {
  position: absolute;
  top: 20px;
  left: 40px;
  transform: translateX(30%);
  font-size: 3em;
  color: #bbbbbb;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7), 2px 2px 4px rgba(0, 0, 0, 0.5);
}

body {
  background-color: #181922;
  padding-top: 100px; /* Add padding to the body to make content visible below the fixed navigation */
}

.separator {
  color: #2c3e50;
  margin: 20px;
}
.footer {
  background-color: #101f3a;
  padding: 20px 10px;
  color: #538eca;
  font-size: 0.9em;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.footer p {
  margin: 2px 0;
}
</style>
