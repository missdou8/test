<template>
  <div class="create">
    <van-uploader class="uploader" :after-read="onRead">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加赛事封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
    </van-uploader>
    <div class="create_content">
      <div class="title">
        <span class="title_name">标题</span>
        <span contenteditable="true" ref="matchTitle" class="title_name_content">{{titlePlace}}</span>
      </div>
      <div class="create_content_intro" contenteditable="true" @focus="contentFocus(contentPlace,$event)" @blur="contentBlur(contentPlace,$event)" @keyup.enter="nextLine" ref="createIntro" v-html="contentPlace"></div>
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
      titlePlace: this.$store.state.match.detail.title || "添加比赛名称",
      contentPlace: this.$store.state.match.detail.content || "请添加图文介绍",
      coverImg: this.$store.state.match.detail.coverImg,
      appendShow: false
    };
  },
  mounted() {
    let inputs = document.querySelectorAll(".s_edit");
    let that = this;
    inputs.forEach(item => {
      item.addEventListener("change", function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let files = {
            file: file,
            content: reader.result
          };
          that.upload(files, src => {
            this.parentElement.parentElement.querySelector("img").src = src;
          });
        };
      });
    });
  },
  computed: {
    /**
     * 是否展示添加封面
     */
    addShow() {
      return this.coverImg ? false : true;
    }
  },
  methods: {
    onRead(file) {
      this.upload(file, src => {
        this.coverImg = src;
      });
    },
    contentFocus() {
      this.appendShow = true;
    },
    contentBlur() {
      this.appendShow = false;
    },
    nextLine() {},
    nextClick() {
      // 获取标题和内容的dom节点
      let containDom = this.$refs.createIntro;
      let titleDom = this.$refs.matchTitle;

      //标题和内容
      let title = titleDom.innerHTML;
      let content = containDom.innerHTML;

      //TODO: 提示是否有更好的方法
      //判断是否可以跳转，单独提示
      if (!this.coverImg) {
        return this.$toast("需要添加赛事封面");
      }
      if (title == "添加比赛名称" || !title) {
        return this.$toast("需要填写赛事名称");
      }
      if (!content || content == "请添加图文介绍") {
        return this.$toast("需要填写赛事详情");
      }
      this.$store.commit("setDetail", {
        title: title,
        content: content,
        coverImg: this.coverImg
      });
      this.$store.commit("setIsEdit", false);
      this.$router.push("style");
    },
    append(file) {
      let containDom = this.$refs.createIntro;
      let div = document.createElement("div");
      div.style.position = "relative";
      div.style.marginBottom = "0.2rem";
      //为了使修改图片更加好用，在图片表面覆盖一个图片选择器
      let input = document.createElement("input");
      input.type = "file";
      input.style.position = "absolute";
      input.style.width = "100%";
      input.style.height = "100%";
      input.style.opacity = 0;
      input.classList.add("s_edit");
      let that = this;
      input.addEventListener("change", function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let files = {
            file: file,
            content: reader.result
          };
          that.upload(files, src => {
            this.parentElement.parentElement.querySelector("img").src = src;
          });
        };
      });
      div.classList.add("img_content");
      let img = document.createElement("img");
      div.appendChild(input);
      div.appendChild(img);
      img.style.width = "100%";
      img.style.display = "block";
      this.upload(file, src => {
        img.src = src;
      });
      //获取光标位置
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
  background-color: #000;
  border-radius: 0.1rem;
  margin: 0.3rem;
  padding: 0.3rem;
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
.create_content span:focus {
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

.title {
  border-top: 0.025rem solid #f5f5f5;
  border-bottom: 0.025rem solid #f5f5f5;
  padding: 0.2rem;
}
.title_name {
  color: #000;
  font-size: 0.32rem;
  margin-right: 0.2rem;
}
.title_name_content {
  display: inline-block;
  width: 5rem;
}
</style>

