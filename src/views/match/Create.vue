<template>
  <div class="create">
    <van-uploader class="uploader" :after-read="onRead">
      添加封面
    </van-uploader>
    <div class="create_content">
      <h1 contenteditable="true" ref="matchTitle" @input="titleInput" @focus="focus(titlePlace, $event)" @blur="blur(titlePlace,$event)">{{titlePlace}}</h1>
      <div class="create_content_intro" contenteditable="true" @focus="focus(contentPlace,$event)" @blur="blur(contentPlace,$event)" @keyup.enter="nextLine" ref="createIntro">{{contentPlace}}</div>
    </div>
    <van-uploader class="append" :after-read="append">
      图片
    </van-uploader>
    <van-button @click="nextClick" class="next">下一步</van-button>
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
    window.addEventListener("scroll", function() {
      console.log("这里开始滚动了");
    });
  },
  methods: {
    onRead() {
      console.log("数据读取完毕");
    },
    titleInput(evt) {
      let value = evt.target.innerHTML;
      if (value === "添加比赛名称") {
      }
    },
    focus(val, evt) {},
    blur(val, evt) {},
    nextLine() {},
    nextClick() {
      let containDom = this.$refs.createIntro;
      console.log(containDom.innerHTML);
      this.$router.push("style");
    },
    append(file) {
      console.log(file);
      let containDom = this.$refs.createIntro;
      let img = document.createElement("img");
      img.style.width = "100%";
      img.src = file.content;
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      if (range.startContainer == this.$refs.createIntro) {
        return containDom.appendChild(img);
      }
      this.$refs.createIntro.insertBefore(img, range.startContainer);
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
  height: 100%;
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
}

.create_content_intro:focus,
.create_content h1:focus {
  outline: none;
}
.append {
  color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.next {
  position: fixed;
  bottom: 0.3rem;
  left: 50%;
  transform: translate(-50%);
}
</style>

