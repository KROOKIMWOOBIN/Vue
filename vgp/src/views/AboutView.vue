<template>
  <div class="about">
    <div class="AddList">
      <button v-if="!showInput" class="AddFont" @click="addPost">글 쓰기</button>
    </div>
    <div class="post-container">
      <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-box">
          <div class="title-box">
            <h3>{{ post.title }}</h3>
            <button class="delete-button" @click="deletePost(post.id)">삭제</button>
          </div>
          <div class="content-box">
            <p>{{ post.content }}</p>
          </div>
        </div>
      </div>
      <div v-if="showInput" class="post-input">
        <div class="input-box">
          <div class="input-field">
            <input type="text" v-model="newPost.title" placeholder="제목">
            <textarea v-model="newPost.content" placeholder="내용"></textarea>
            <div class="button-group">
              <button @click="cancelPost">취소</button>
              <button @click="savePost">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  justify-content: flex-start;
}

.AddList {
  margin-left: 50px;
}

.AddFont {
  font-size: 1.5em;
  color: #538eca;
  border-radius: 10px;
  text-align: right;
}

.post-container {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  position: relative;
}

.post {
  width: 50%;
  padding: 10px;
}

.post-box {
  border: 2px solid #0f244b;
  border-radius: 7px;
  background-color: #101f3a;
  margin-bottom: 7px;
}

.title-box {
  display: flex;
  align-items: flex-start;
}

.title-box h3 {
  margin: 0;
  padding: 10px;
}

.delete-button {
  margin-left: auto;
  color: #ffffff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.content-box {
  padding-left: 10px;
}

.post h3,
.post p {
  color: #ffffff;
}

.post-input {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 20px;
  width: 100%;
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
}

.input-field input,
.input-field textarea {
  margin-bottom: 10px;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>

<script>
export default {
  data() {
    return {
      posts: [],
      newPost: {
        title: "",
        content: "",
      },
      showInput: false,
    };
  },
  created() {
    this.loadPostsFromLocalStorage();
  },
  methods: {
    addPost() {
      this.showInput = true;
    },
    savePost() {
      if (this.newPost.title && this.newPost.content) {
        this.posts.push({
          id: this.posts.length + 1,
          title: this.newPost.title,
          content: this.newPost.content,
        });
        this.newPost.title = "";
        this.newPost.content = "";
        this.showInput = false;
        this.savePostsToLocalStorage();
      }
    },
    cancelPost() {
      this.newPost.title = "";
      this.newPost.content = "";
      this.showInput = false;
    },
    deletePost(postId) {
      this.posts = this.posts.filter((post) => post.id !== postId);
      this.savePostsToLocalStorage();
    },
    savePostsToLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    loadPostsFromLocalStorage() {
      const storedPosts = localStorage.getItem("posts");
      if (storedPosts) {
        this.posts = JSON.parse(storedPosts);
      }
    },
  },
};
</script>
