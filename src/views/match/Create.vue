<template>
    <div class="create">
        <van-uploader class="uploader" :after-read="onRead">
            添加封面
        </van-uploader>
        <div class="create_content">
            <h1 contenteditable="true" ref="matchTitle" @input="titleInput" @focus="focus(titlePlace, $event)" @blur="blur(titlePlace,$event)">{{titlePlace}}</h1>
            <div class="create_content_intro" contenteditable="true" @focus="focus(contentPlace,$event)" @blur="blur(contentPlace,$event)" @keyup.enter="nextLine" ref="createIntro">{{contentPlace}}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      titlePlace: "添加比赛名称",
      contentPlace: "请添加图文介绍"
    };
  },
  mounted() {
    this.$refs.matchTitle.focus();
  },
  methods: {
    onRead() {
      console.log("数据读取完毕");
    },
    titleInput(evt) {
      let value = evt.target.innerHTML;
      if (value === "添加比赛名称") {
      }
      console.log(value);
    },
    focus(val, evt) {
      evt.target.innerHTML === val && (evt.target.innerHTML = "");
    },
    blur(val, evt) {
      evt.target.innerHTML || (evt.target.innerHTML = val);
    },
    nextLine() {
      let p = document.createElement("p");
      //   this.$refs.createIntro.appendChild(p);
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      range.setStart(p, 0);
      range.insertNode(p);
    }
  }
};
</script>

<style scoped>
.create::before {
  content: "";
  display: table;
}
.create {
  text-align: center;
}
.uploader {
  background-color: #555;
  border-radius: 0.2rem;
  color: #fff;
  margin: 0.3rem 0;
  padding: 0.3rem;
  width: 85%;
}
.create_content_intro {
  text-align: left;
  text-indent: 2em;
  user-select: initial;
  -webkit-user-modify: read-write-plaintext-only;
}

.create_content_intro:focus,
.create_content h1:focus {
  outline: none;
  border: 0.01rem solid blue;
}
div {
  min-height: 1rem;
}
textarea {
  text-indent: 2em;
}
</style>

