<template>
  <div class="create">
    <van-uploader class="uploader" :after-read="onRead">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加店铺封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
    </van-uploader>
    <div class="create_content">
      <h1 contenteditable="true" ref="matchTitle" @input="titleInput" @focus="focus(titlePlace, $event)" @blur="blur(titlePlace,$event)">{{titlePlace}}</h1>
      <div class="create_content_intro" contenteditable="true" @focus="contentFocus(contentPlace,$event)" @blur="contentBlur(contentPlace,$event)" @keyup.enter="nextLine" ref="createIntro">{{contentPlace}}</div>
    </div>
    <van-uploader v-show="appendShow" class="append" :after-read="append">
      <img src="../../assets/img_add.png" alt="添加图片">
    </van-uploader>
    <van-button @click="nextClick" class="next">下一步</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titlePlace: "添加比赛名称",
      contentPlace: "请添加图文介绍",
      addShow: true,
      coverImg: "",
      appendShow: false
    };
  },
  mounted() {
    this.$refs.matchTitle.focus();
  },
  methods: {
    onRead(file) {
      this.upload(file).then(src => {
        this.coverImg = src;
        this.addShow = false;
      });
    },
    titleInput(evt) {
      let value = evt.target.innerHTML;
      if (value === "添加比赛名称") {
      }
    },
    focus(val, evt) {},
    contentFocus() {
      this.appendShow = true;
    },
    contentBlur() {
      this.appendShow = false;
    },
    blur(val, evt) {},
    nextLine() {},
    nextClick() {
      let containDom = this.$refs.createIntro;
      let titleDom = this.$refs.matchTitle;
      this.$store.commit("setTitle", titleDom.innerHTML);
      this.$store.commit("setDetail", containDom.innerHTML);
      this.$router.push("style");
    },
    append(file) {
      let containDom = this.$refs.createIntro;
      let div = document.createElement("div");
      div.style.position = "relative";
      let img = document.createElement("img");
      div.appendChild(img);
      img.style.width = "100%";
      img.style.display = "block";
      this.upload(file).then(src => {
        img.src = src;
      });
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      if (range.startContainer == this.$refs.createIntro) {
        return containDom.appendChild(div);
      }
      this.$refs.createIntro.insertBefore(div, range.startContainer);
    },
    upload(file) {
      return this.resource.uploadImg({ file: file }).then(res => {
        let data = res.data;
        return data.src[0];
      });
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
.create::before {
  content: "";
  display: table;
}
.create {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  padding-bottom: 1.5rem;
  text-align: center;
}
.uploader {
  background-color: #000;
  border-radius: 0.1rem;
  color: #fff;
  margin: 0.3rem 0;
  width: 100%;
}
.cover-img {
  vertical-align: middle;
}
.addCover {
  margin: 0.3rem;
}
.create_content {
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  overflow: hidden;
  text-align: left;
}
.create_content_intro {
  flex-grow: 1;
  flex-basis: 0;
  text-indent: 2em;
  user-select: initial;
  margin-top: 0.2rem;
  overflow: auto;
}

.create_content_intro:focus,
.create_content h1:focus {
  outline: none;
}
.append {
  color: red;
  position: fixed;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}
.next {
  position: fixed;
  bottom: 0.3rem;
  left: 50%;
  width: 40%;
  border: 0.02rem solid #ffd321;
  transform: translate(-50%);
}
/* 图片添加按钮 */
.add {
  color: #ffd321;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.3rem;
  font-weight: bold;
}
.add_img {
  background: url("../../assets/img_add.png") center/100% 100% no-repeat;
  height: 0.39rem;
  width: 0.49rem;
  margin-right: 0.1rem;
}
</style>

