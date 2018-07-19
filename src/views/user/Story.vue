<template>
  <div class="create">
    <div class="uploader" @click="onRead">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加故事封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
    </div>
    <div class="create_content">
      <div class="create_content_intro" contenteditable="true" @focus="contentFocus(contentPlace,$event)" @blur="contentBlur(contentPlace,$event)" ref="createIntro" v-html="contentPlace"></div>
    </div>
    <div v-show="appendShow" class="append" @click="appendImg">
      <img src="../../assets/add.png" alt="添加图片">
    </div>
    <van-uploader class="append_img" :after-read="append">
    </van-uploader>
    <van-button @click="nextClick" class="next">完成</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titlePlace: "添加比赛名称",
      contentPlace: "请添加图文介绍",
      coverImg: "",
      appendShow: false,
      uploadType: "append",
      replaceDom: ""
    };
  },
  created() {
    this.http.user.getShopInfo().then(res => {
      let data = res.data;
      this.coverImg = data.cover;
      this.contentPlace = data.content || "请添加图文介绍";
    });
  },
  computed: {
    addShow() {
      return this.coverImg ? false : true;
    }
  },
  methods: {
    appendImg(evt) {
      this.uploadType = "append";
      //获取插入图片按钮
      let input = document.querySelector(".van-uploader__input");
      input.click();
    },
    onRead(file) {
      this.uploadType = "upload";
      let input = document.querySelector(".van-uploader__input");
      input.click();
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
    nextClick() {
      let containDom = this.$refs.createIntro;
      this.http.user
        .setShopInfo({
          cover: this.coverImg,
          content: containDom.innerHTML
        })
        .then(res => {
          this.$router.go(-1);
        });
    },
    append(file) {
      if (this.uploadType == "replace") {
        this.upload(file, src => {
          this.replaceDom.src = src;
        });
        return;
      }
      if (this.uploadType == "upload") {
        this.upload(file, src => {
          this.coverImg = src;
        });
        return;
      }
      let containDom = this.$refs.createIntro;
      let div = document.createElement("div");
      div.style.position = "relative";
      div.classList.add("img_content");
      let that = this;
      let img = document.createElement("img");
      //获取插入图片按钮
      let input = document.querySelector(".van-uploader__input");
      img.addEventListener("click", function(evt) {
        that.uploadType = "replace";
        that.replaceDom = img;
        input.click();
      });
      let br = document.createElement("br");

      //插入动作
      div.appendChild(img);
      div.appendChild(br);
      img.style.width = "100%";
      img.style.display = "block";
      this.upload(file, src => {
        img.src = src;
      });
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      range.insertNode(div);
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
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  padding-bottom: 1.5rem;
  text-align: center;
}
.uploader {
  color: #fff;
  margin: 0.3rem 0;
  width: 100%;
}
.cover-img {
  height: 2.65rem;
  vertical-align: middle;
}
.addCover {
  border-radius: 0.1rem;
  background-color: #000;
  margin: 0.3rem;
  padding: 0.3rem 0;
}
.create_content {
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  text-align: left;
}
.create_content_intro {
  flex-grow: 1;
  flex-basis: 0;
  text-indent: 2em;
  user-select: initial;
  margin-top: 0.2rem;
  padding-bottom: 0.5rem;
}
.create_content_intro div {
  text-indent: 2em;
}

.create_content_intro:focus {
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
  background-color: #ffd321;
  font-size: 0.3rem;
  font-weight: bold;
  position: fixed;
  bottom: 0rem;
  left: 50%;
  width: 100%;
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
.append_img {
  position: absolute;
  left: 1000px;
  top: 1000px;
  opacity: 0;
}
</style>

