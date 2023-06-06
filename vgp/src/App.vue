<template>
  <div>
    <header>
      <nav class="sticky-nav">
      <router-link to="/">
        <h1 class="game_title">FPS</h1>
      </router-link>
      <router-link to="/" exact>홈</router-link>
      <span class="separator">|</span>
      <router-link to="/about">커뮤니티</router-link>
    </nav>
    </header>
    <router-view />
    <footer class="footer">
      <p>Created by Kim Woo-bin<br>Email: woodol4540@naver.com</p>
      <button class="upbtn" @click="scrollToTop">UP</button>
    </footer>
  </div><br><br><br><br><br>
</template>

<style>
@import "@/assets/App.css";
</style>

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
  mounted() {
    window.addEventListener('wheel', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('wheel', this.handleScroll);
  },
  handleScroll(event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    window.scrollBy({
      top: window.innerHeight * delta,
      behavior: 'smooth',
    });
  },
};
</script>

