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
        <!-- 댓글 표시 -->
        <div class="comments">
          <div v-for="comment in post.comments" :key="comment.id" class="comment">
            <p>{{ comment.content }}</p><br>
            <span>{{ comment.author }}</span><br>
            <button class="delete-button" @click="deleteComment(post, comment)">삭제</button>
          </div>
        </div>
        <!-- 댓글 작성을 위한 입력 폼 -->
        <div class="comment-input">
          <div class="input-field">
            <input type="text" :value="getCommentContent(post.id)" @input="updateCommentContent(post.id, $event.target.value)" placeholder="작성자">
            <input type="text" :value="getCommentAuthor(post.id)" @input="updateCommentAuthor(post.id, $event.target.value)" placeholder="댓글">
            <button class="btnOn" @click="addComment(post)">작성</button>
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
          <textarea v-model="newPost.content" cols="22" role="10" placeholder="내용"></textarea>
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

<style>
@import "../assets/About.css";
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
      commentInputs: {}, // 댓글 입력을 위한 객체 맵
    };
  },
  created() {
    this.loadPostsFromLocalStorage(); // 로컬 스토리지에서 게시물을 로드하는 함수 호출
  },
  methods: {
    addPost() {
      this.loggedInId = "";
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
          comments: [], // 댓글을 저장할 배열 추가
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
    addComment(post) {
      const commentInput = this.commentInputs[post.id];
      if (commentInput && commentInput.content && commentInput.author) {
        // 댓글 입력 폼의 내용과 작성자가 비어있지 않은 경우에만 실행
        post.comments.push({
          id: post.comments.length + 1,
          content: commentInput.content,
          author: commentInput.author,
        });
        // 댓글 입력 폼 초기화
        commentInput.content = "";
        commentInput.author = "";
        this.savePostsToLocalStorage(); // 게시물을 로컬 스토리지에 저장하는 함수 호출
      }
    },
    deleteComment(post, comment) {
      post.comments = post.comments.filter((c) => c.id !== comment.id); // 해당 ID의 댓글을 배열에서 제거
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
    getCommentContent(postId) {
      if (!this.commentInputs[postId]) {
        this.commentInputs[postId] = { content: "", author: "" };
      }
      return this.commentInputs[postId].content;
    },
    getCommentAuthor(postId) {
      if (!this.commentInputs[postId]) {
        this.commentInputs[postId] = { content: "", author: "" };
      }
      return this.commentInputs[postId].author;
    },
    updateCommentContent(postId, value) {
      if (!this.commentInputs[postId]) {
        this.commentInputs[postId] = { content: "", author: "" };
      }
      this.commentInputs[postId].content = value;
    },
    updateCommentAuthor(postId, value) {
      if (!this.commentInputs[postId]) {
        this.commentInputs[postId] = { content: "", author: "" };
      }
      this.commentInputs[postId].author = value;
    },
  },
};
</script>
