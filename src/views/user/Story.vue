<template>
  <div id="create">
    <div class="uploader" @click="onRead" :class="{disabled: storyStatus==3}">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加故事封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
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
    <van-uploader class="append_img" :after-read="append"></van-uploader>
    <van-button
      @click="nextClick"
      class="next"
      :class="{disabled: storyStatus==3}"
    >{{btnMsg[storyStatus]}}</van-button>
  </div>
</template>

<script>
import "../../../node_modules/quill/dist/quill.snow.css";
import Quill from "quill";
export default {
  data() {
    return {
      titlePlace: "添加比赛名称",
      contentPlace: "",
      coverImg: "",
      uploadType: "append",
      replaceDom: "",
      storyStatus: 0,
      btnMsg: {
        0: "提交审核",
        1: "提交审核",
        2: "提交审核",
        3: "审核中"
      }
    };
  },
  mounted() {
    const winHeight = window.innerHeight; //获取当前页面高度
    window.onresize = function() {
      var thisHeight = window.innerHeight;
      if (winHeight - thisHeight > 50) {
        document.querySelector(".uploader").style.display = "none";
        document.querySelector(".next").style.display = "none";
      } else {
        document.querySelector(".uploader").style.display = "block";
        document.querySelector(".next").style.display = "block";
      }
    };
    //初始化编辑器
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
    //对工具栏的处理
    let toolbar = document.querySelector("#toolbar-container");
    let editorDiv = document.querySelector(".editor");
    toolbar.style.display = "none";
    editorDiv.style.border = "0px solid #ccc";
    editor.on("selection-change", function(range, oldRange, source) {
      if (range) {
        if (range.length == 0) {
          toolbar.style.display = "block";
        }
      } else {
        toolbar.style.display = "none";
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
    //初始化内容
    this.fetchInfo().then(data => {
      window.editor.container.firstChild.innerHTML = data;
      if (this.storyStatus == 3) {
        document
          .querySelector(".ql-editor")
          .setAttribute("contenteditable", false);
      }
    });
  },
  computed: {
    addShow() {
      return this.coverImg ? false : true;
    }
  },
  methods: {
    fetchInfo() {
      return this.http.user.getShopInfo().then(res => {
        let data = res.data;
        this.coverImg = data.cover;
        this.storyStatus = data.status || 0;
        this.contentPlace = data.content;
        return this.contentPlace;
      });
    },
    onRead(file) {
      this.uploadType = "upload";
      let input = document.querySelector(".van-uploader__input");
      input.click();
    },
    nextClick() {
      let content = window.editor.container.firstChild.innerHTML;
      if (!this.coverImg) {
        return this.$toast("请上传封面图片");
      }
      if (content == "<p><br></p>") {
        return this.$toast("请填写故事内容");
      }
      this.http.user
        .setShopInfo({
          cover: this.coverImg,
          content: content
        })
        .then(res => {
          this.$router.go(-1);
        });
    },
    append(file) {
      if (this.uploadType == "replace") {
        this.compressAndUpload(file.file).then(src => {
          this.replaceDom.src = src;
        });
        return;
      }
      if (this.uploadType == "upload") {
        this.compressAndUpload(file.file).then(src => {
          this.coverImg = src;
        });
        return;
      }
      let div = document.createElement("div");
      div.style.position = "relative";
      div.classList.add("img_content");
      let that = this;
      let img = document.createElement("img");
      //获取插入图片按钮
      let input = document.querySelector(".van-uploader__input");
      img.addEventListener("click", function(evt) {
        evt.preventDefault();
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
      this.compressAndUpload(file.file).then(src => {
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
.exit {
  display: none;
}
.editor_content {
  height: 100%;
}
#create::before {
  content: "";
  display: table;
}
#create {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  text-align: center;
  overflow-y: auto;
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
  position: relative;
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
  width: 100%;
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
  left: 0px;
  top: 0px;
  opacity: 0;
  z-index: -1000;
}
.disabled {
  pointer-events: none;
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

