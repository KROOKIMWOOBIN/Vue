<template>
    <div>
        <div v-if="isLoggedIn">
            <p>로그인되었습니다.</p>
            <!-- 로그인 후에 보여줄 내용 -->
        </div>
        <div v-else>
            <div class="Login">
                <label for="loginId">아이디</label>
                <input type="email" id="loginId" name="loginId" placeholder="ID" v-model="loginId">
                <label for="loginPw">비밀번호</label>
                <input type="password" id="loginPw" name="password" placeholder="Password" v-model="loginPw">
            </div>
            <button type="submit" @click="login">로그인</button>
            <button type="submit" class="naver" @click="openHamburgerMenu">계정 연동</button>
            <div>
                <input type="checkbox" id="keepLogin" name="keepLogin">
                <label for="keepLogin"><span>로그인 상태 유지</span></label>
            </div>
            <!-- 모달 -->
            <div class="modal" v-show="showHamburgerMenu">
                <div class="modal-content">
                    <button class="close" @click="closeHamburgerMenu">×</button>
                    <!-- 다른 로그인 옵션을 추가하세요 -->
                    <button class="google" @click="loginWithGoogle">Google</button>
                    <button class="kakao" @click="loginWithKakao">Kakao</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style>
@import "@/assets/Login.css";
</style>
  
<script>
export default {
    data() {
        return {
            loginId: '',
            loginPw: '',
            isLoggedIn: false,
            showHamburgerMenu: false
        };
    },
    methods: {
        login() {
            if (this.isLoggedIn) {
                window.alert('이미 로그인되었습니다.');
            } else if (this.loginId === '' || this.loginPw === '') {
                window.alert('아이디와 비밀번호를 입력해주세요.');
            } else {
                window.alert('로그인 성공');
                this.isLoggedIn = true;
            }
        },
        openHamburgerMenu() {
            this.showHamburgerMenu = true;
        },
        closeHamburgerMenu() {
            this.showHamburgerMenu = false;
        },
        loginWithGoogle() {
            // Google 로그인 처리 로직
            // ...
            window.alert('Google 로그인');
            this.showHamburgerMenu = false;
            this.isLoggedIn = true;
        },
        loginWithKakao() {
            // Kakao 로그인 처리 로직
            // ...
            window.alert('Kakao 로그인');
            this.showHamburgerMenu = false;
            this.isLoggedIn = true;
        }
    }
};
</script>
  