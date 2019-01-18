<template>
  <div class="create">
    <div class="uploader" @click="onRead">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加赛事封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
    </div>
    <div class="create_content">
      <div class="title">
        <span class="title_name">标题</span>
        <input class="title_content" type="text" placeholder="请添加比赛名称" v-model="titlePlace">
      </div>
      <div id="toolbar-container">
        <button
          class="ql-image"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Add italic text <cmd+i>"
        ></button>
      </div>
      <div class="editor"></div>
    </div>
    <div v-show="appendShow" class="append" @click="appendImg">
      <img src="../../assets/add.png" alt="添加图片">
    </div>
    <van-button @click="nextClick" class="next">下一步</van-button>
    <van-uploader class="append_img" :after-read="append"></van-uploader>
  </div>
</template>

<script>
import "../../../node_modules/quill/dist/quill.snow.css";
import Quill from "quill";
import axios from "axios";
import { isIos } from "lputils";
export default {
  data() {
    return {
      titlePlace: this.$store.state.match.detail.title,
      contentPlace: this.$store.state.match.detail.content,
      coverImg: this.$store.state.match.detail.coverImg,
      appendShow: false,
      uploadType: "append", //分为append和upload
      currentImg: "",
      replaceDom: ""
    };
  },
  computed: {
    /**
     * 是否展示添加封面
     */
    addShow() {
      return this.coverImg ? false : true;
    }
  },
  mounted() {
    //监听键盘事件
    const winHeight = window.innerHeight; //获取当前页面高度
    window.onresize = function() {
      var thisHeight = window.innerHeight;
      if (winHeight - thisHeight > 50) {
        document.querySelector(".title").style.display = "none";
        document.querySelector(".uploader").style.display = "none";
        document.querySelector(".next").style.display = "none";
      } else {
        document.querySelector(".title").style.display = "block";
        document.querySelector(".uploader").style.display = "block";
        document.querySelector(".next").style.display = "block";
      }
    };

    let that = this;
    //编辑器配置
    var options = {
      debug: false,
      modules: {
        toolbar: "#toolbar-container"
      },
      placeholder: "请填写图文信息",
      readOnly: false,
      theme: "snow"
    };
    //初始化编辑器
    let editor = new Quill(".editor", options);
    window.editor = editor;
    if (this.contentPlace) {
      editor.container.firstChild.innerHTML = this.contentPlace;
    }
    //对工具栏的处理
    let toolbar = document.querySelector("#toolbar-container");
    let editorDiv = document.querySelector(".editor");
    toolbar.style.display = "none";
    editorDiv.style.border = "1px solid #ccc";
    editor.on("selection-change", function(range, oldRange, source) {
      if (range) {
        if (range.length == 0) {
          toolbar.style.display = "block";
          // if (!isIos()) {
          //   document.querySelector(".uploader").style.display = "none";
          //   document.querySelector(".next").style.display = "none";
          // }
        }
      } else {
        toolbar.style.display = "none";
        // if (!isIos()) {
        //   document.querySelector(".uploader").style.display = "block";
        //   document.querySelector(".next").style.display = "block";
        // }
      }
    });
    //处理图片
    editor.getModule("toolbar").addHandler("image", function() {
      let fileInput = this.container.querySelector("input.ql-image[type=file]");
      if (fileInput == null) {
        fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.setAttribute("accept", "*");
        fileInput.classList.add("ql-image");
        fileInput.addEventListener("change", function() {
          if (fileInput.files != null && fileInput.files[0] != null) {
            //压缩并上传图片
            let file = fileInput.files[0];
            that.compressAndUpload(file).then(imgSrc => {
              var range = editor.getSelection(true);
              editor.insertEmbed(range.index, "image", imgSrc);
              editor.setSelection(range.index + 1);
            });
          }
        });
        this.container.appendChild(fileInput);
      }
      fileInput.click();
    });
  },
  methods: {
    onRead(file) {
      this.uploadType = "upload";
      //获取插入图片按钮
      let input = document.querySelector(".van-uploader__input");
      input.click();
    },
    appendImg(evt) {
      this.uploadType = "append";
      //获取插入图片按钮
      let input = document.querySelector(".van-uploader__input");
      input.click();
    },
    nextClick() {
      //标题和内容
      let title = this.titlePlace;
      let content = window.editor.container.firstChild.innerHTML;
      //判断是否可以跳转，单独提示
      if (!this.coverImg) {
        return this.$toast("需要添加赛事封面");
      }
      if (!title) {
        return this.$toast("需要填写赛事名称");
      }
      if (!content || content == "<p><br></p>") {
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
    /**
     * 所有插入图片操作共用一个方法
     * 1. 将图片插入当前光标所在处
     * 2. 替换当前选中的图片
     */
    append(file) {
      if (this.uploadType == "replace") {
        this.compressAndUpload(file.file).then(imgSrc => {
          this.replaceDom.src = imgSrc;
        });
        return;
      }
      if (this.uploadType == "upload") {
        this.compressAndUpload(file.file).then(imgSrc => {
          this.coverImg = imgSrc;
        });
        return;
      }
      let containDom = this.$refs.createIntro;
      //判断文中是否只有默认文本，如果是则清除
      if (containDom.innerHTML == "请添加图文介绍") {
        containDom.innerHTML = "";
      }
      let div = document.createElement("div");
      div.content = "content";
      div.style.position = "relative";
      div.classList.add("img_content");
      let img = document.createElement("img");
      //获取插入图片按钮
      let input = document.querySelector(".van-uploader__input");
      //点击img的时候调用插入图片方法
      const that = this;
      img.addEventListener("click", function(evt) {
        that.uploadType = "replace";
        that.replaceDom = img;
        input.click();
      });
      let br = document.createElement("br");
      div.appendChild(img);
      div.appendChild(br);
      img.style.width = "100%";
      img.style.display = "block";

      this.compressAndUpload(file.file).then(imgSrc => {
        img.src = imgSrc;
      });
      //获取光标位置
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      range.insertNode(div);
    }
  },
  beforeRouteLeave(to, from, next) {
    document.querySelector(".title_content").focus();
    next();
  }
};
</script>

<style scoped>
.exit {
  display: none;
}
.create::before {
  content: "";
  display: table;
}
.create {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0.3rem 0.3rem 0;
  /* padding-bottom: 1.5rem; */
  position: relative;
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
.create_content input {
  background-color: transparent;
}
.append {
  color: red;
  position: fixed;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}
.next {
  /* position: absolute; */
  /* bottom: 0.3rem;
  left: 50%; */
  width: 40%;
  border: 0.02rem solid #ffd321;
  margin: 0.2rem auto;
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
.append_img {
  position: absolute;
  left: 1000px;
  top: 1000px;
  opacity: 0;
}
.title_content {
  width: 4.8rem;
}
#toolbar-container {
  background-color: #fff;
  border: none;
}
.editor {
  flex-basis: 0;
  flex-grow: 1;
  overflow: auto;
  font-size: 0.28rem;
  background-color: #fff;
}
</style>

