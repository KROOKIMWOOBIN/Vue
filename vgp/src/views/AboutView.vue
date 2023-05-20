<template>
  <div class="about">
    <!-- 글 쓰기 버튼 -->
    <div class="AddList">
      <button v-if="!showInput" class="AddFont" @click="addPost">글 쓰기</button>
    </div>

    <!-- 게시물 컨테이너 -->
    <div v-if="!showInput" class="post-container">
      <!-- 각 게시물 표시 -->
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-box">
          <!-- 게시물 제목과 삭제 버튼 -->
          <div class="title-box">
            <h3>{{ post.title }}</h3>
            <button class="delete-button" @click="deletePostConfirmation(post)">삭제</button>
          </div>
          <!-- 게시물 내용 -->
          <div class="content-box">
            <p>{{ post.content }}</p>
            <img v-if="post.image" :src="post.image" alt="Uploaded Image" class="image-preview">
          </div>
        </div>
      </div>
    </div>

    <!-- 새 게시물 작성을 위한 입력 폼 -->
    <div v-if="showInput" class="post-input">
      <div class="input-box">
        <div class="input-field">
          <input type="text" v-model="loggedInId" placeholder="ID">
          <input type="text" v-model="newPost.title" placeholder="제목">
          <textarea v-model="newPost.content" placeholder="내용"></textarea>
          <!-- 이미지 업로드를 위한 input 요소 추가 -->
          <input type="file" @change="handleImageUpload" accept="image/*">
          <!-- 업로드된 이미지 미리보기를 위한 이미지 요소 -->
          <img v-if="newPost.image" :src="newPost.image" alt="Uploaded Image" class="image-preview">
          <!-- 게시물 저장 또는 취소를 위한 버튼들 -->
          <div class="button-group">
            <button class="btnOn" @click="savePost">저장</button>
            <button class="btnOn" @click="cancelPost">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.image-preview {
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
}

.about {
  display: flex;
  justify-content: space-between; /* 포스트 컨테이너와 글 쓰기 버튼을 양쪽으로 정렬 */
}

.AddList {
  order: 2; /* 글 쓰기 버튼을 첫 번째로 배치 */
  margin-left: auto; /* 오른쪽 여백 추가 */
}

.AddFont {
  font-size: 1.5em;
  color: #538eca;
  border-radius: 10px;
  text-align: right; /* 버튼 텍스트를 오른쪽 정렬 */
  margin-top: 20px;
  margin-right: 100px;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
  transition: all 0.1s ease-in-out;
}

.AddFont:hover {
  transform: translateY(2px);
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
}

.post-container {
  order: 1; /* 게시물 컨테이너를 두 번째로 배치 */
  display: flex;
  flex-wrap: wrap; /* 포스트를 여러 줄에 걸쳐 나열 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 이미지를 위쪽으로 정렬 */
  margin-right: 0px;
  margin-top: 0px;
  flex-grow: 1;
}

.post-input {
  order: 3; /* 새 게시물 입력 폼을 세 번째로 배치 */
  position: absolute;
  top: 0;
  right: 0;
  width: 50%; /* 새 게시물 입력 폼이 전체 너비를 차지 */
  margin-top: 150px;
}

.post {
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box; /* padding을 포함한 너비 계산 */
}

@media (max-width: 576px) {
  .post {
    width: 100%; /* 작은 화면에서는 포스트를 한 줄에 하나씩 표시 */
  }
}

@media (min-width: 577px) {
  .post-container {
    justify-content: flex-start; /* 왼쪽 정렬 */
    flex-direction: row;
  }

  .post {
    flex-basis: 30%; /* 각 포스트의 기본 너비 설정 */
    margin: 10px; /* 포스트 사이 간격 설정 */
  }
}


.input-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.input-field {
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  width: 100%; /* 버튼 그룹의 너비를 100%로 설정하여 오른쪽 정렬 */
}

.btnOn {
  float: right;
  margin-right: 0.5cm;
  margin-bottom: 1cm;
  background-color: rgba(118, 174, 241, 1);
  border: none;
  padding: 0.2cm 0.4cm;
  border-radius: 10px;
  border: 2px solid rgb(41, 120, 218);
  animation-delay: 0;
  animation-duration: 1s;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  color: white;
}

.btnOn:hover {
  transform: translateY(2px);
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.post-box {
  border: 1px solid #ccc;
  border-radius: 7px;
  background-color: #f9f9f9;
  padding: 30px;
  height: 250px;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
}

.title-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.title-box h3 {
  margin: 0;
}

.delete-button {
  color: #999;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  box-shadow: 3px 3px 5px rgba(0,0,0,0.3);
  border-radius: 7px;
  border: 2px solid rgb(41, 120, 218);
  color: rgba(118, 174, 241, 1);
}

.delete-button:hover {
  transform: translateY(2px);
  box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}

.image-preview {
  max-width: 100%;
  max-height: 150px;
  margin-top: 10px;
}

.input-field input,
.input-field textarea {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  color: #333;
}

</style>

<script>
export default {
  data() {
    return {
      posts: [], // 게시물을 저장하는 배열
      newPost: {
        title: "",
        content: "",
        image: null, // 이미지 데이터를 저장할 변수 추가
      }, // 새 게시물을 생성하기 위한 객체
      showInput: false, // 새 게시물 입력 폼을 표시하는 상태 변수
      loggedInId: "", // 게시물에 접근할 수 있는 권한
    };
  },
  created() {
    this.loadPostsFromLocalStorage(); // 로컬 스토리지에서 게시물을 로드하는 함수 호출
  },
  methods: {
    addPost() {
      this.showInput = true; // 새 게시물 입력 폼 표시
    },
    savePost() {
      if (this.newPost.title) {
        // 새 게시물의 제목과 내용이 비어있지 않은 경우에만 실행
        this.posts.push({
          id: this.posts.length + 1,
          title: this.newPost.title,
          content: this.newPost.content,
          image: this.newPost.image, // 이미지 데이터 추가
        });
        this.newPost.title = "";
        this.newPost.content = "";
        this.newPost.image = null; // 이미지 데이터 초기화
        this.showInput = false; // 새 게시물 입력 폼 숨김
        this.savePostsToLocalStorage(); // 게시물을 로컬 스토리지에 저장하는 함수 호출
      }
    },
    cancelPost() {
      this.newPost.title = "";
      this.newPost.content = "";
      this.newPost.image = null; // 이미지 데이터 초기화
      this.showInput = false; // 새 게시물 입력 폼 숨김
    },
    deletePostConfirmation(post) {
        const inputId = prompt("게시물을 삭제하려면 ID를 입력하세요:")?.trim();
      if (inputId && (inputId === this.loggedInId || inputId === "4540")) {
        // 입력한 ID와 loggedInId가 모두 존재하고 일치하거나 loggedInId가 "4540"인 경우
        this.deletePost(post.id);
        alert("삭제 완료");
      } else {
        alert("올바른 ID를 입력해주세요.");
      }
    },  
    deletePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId); // 해당 ID의 게시물을 배열에서 제거
      this.savePostsToLocalStorage(); // 게시물을 로컬 스토리지에 저장하는 함수 호출
    },
    savePostsToLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.posts)); // 게시물을 로컬 스토리지에 저장
    },
    loadPostsFromLocalStorage() {
      const storedPosts = localStorage.getItem("posts"); // 로컬 스토리지에서 게시물을 가져옴
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts); // 가져온 게시물을 배열에 저장
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.newPost.image = reader.result;
        };
      }
    },
  },
};
</script>
