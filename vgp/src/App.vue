<template>
  <div>
    <header>
      <nav class="sticky-nav">
        <router-link to="/">
          <h1 :style="{ color: titleColor, textShadow: titleShadow }" class="game_title">FPS</h1>
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

.game_title {
  text-shadow: 2px 2px 4px silver; /* 그림자 초기값 */
}
</style>

<script>
export default {
  data() {
    return {
      titleColor: "silver",
      titleShadow: "2px 2px 4px silver",
    };
  },
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
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
  mounted() {
    window.addEventListener("wheel", this.handleScroll);
    setInterval(() => {
      const color = this.getRandomColor();
      this.titleColor = color;
      this.titleShadow = `2px 2px 4px ${color}`;
    }, 100); // 1초마다 변경 (원하는 간격으로 수정 가능)
  },
  unmounted() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  handleScroll(event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    window.scrollBy({
      top: window.innerHeight * delta,
      behavior: "smooth",
    });
  },
};
</script>