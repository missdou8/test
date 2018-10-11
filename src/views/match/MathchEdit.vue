<template>
  <div class="edit">
    <div class="cover">
      <img :src="cover" alt="封面">
      <van-uploader class="cover_edit" :after-read="onRead">修改封面</van-uploader>
    </div>
    <div class="title">
      <span>标题</span>
      <span class="can-edit" ref="title" :contenteditable="isPublish">{{title}}</span>
      <button v-show="!isPublish" class="cover_edit" @click="shareImgClick">修改分享图>></button>
    </div>
    <div id="toolbar-container">
      <button class="ql-image" data-toggle="tooltip" data-placement="bottom" title="Add italic text <cmd+i>"></button>
    </div>
    <div class="editor"></div>
    <van-uploader v-show="appendShow" class="append" :after-read="append">
      <img src="../../assets/add.png" alt="添加图片">
    </van-uploader>
    <div class="btn" :class="{next: isPublish}" v-show="isPublish">
      <button @click="next">下一步</button>
    </div>
    <div class="btn footer" :class="{next: !isPublish}" v-show="!isPublish">
      <button @click="saveClick">保存</button>
      <button @click="checkClick">提交审核</button>
    </div>
    <van-button class="exit">点击退出编辑</van-button>

  </div>
</template>


<script>
import "../../../node_modules/quill/dist/quill.snow.css";
import Quill from "quill";
import ImageCompressor from "image-compressor.js";
import axios from "axios";
import { isIos } from "lputils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      detail: this.$store.state.match.detail,
      appendShow: false,
      isPublish: true
    };
  },
  computed: {
    ...mapState({
      cover(state) {
        return state.match.detail.coverImg;
      },
      title(state) {
        return state.match.detail.title;
      },
      content(state) {
        return state.match.detail.content;
      }
    })
  },
  created() {
    if (
      this.$route.query.id == 7 ||
      this.$route.query.id == 8 ||
      this.$route.query.type == 1
    ) {
      this.isPublish = false;
    }
  },
  mounted() {
    let imgContentDoms = document.querySelectorAll(".img_content");
    let trueContent = [];
    imgContentDoms.forEach(item => {
      if ((item.content = "content")) {
        trueContent.push(item);
      }
    });
    trueContent.forEach(item => {
      let editBtn = document.createElement("div");
      editBtn.classList.add("edit_cover");
      let editImgShow = document.createElement("button");
      editImgShow.innerHTML = "修改图片";
      editImgShow.classList.add("edit_btn");
      let editImg = document.createElement("input");
      editImg.classList.add("edit_input");
      editImg.readOnly = "readonly";
      editImg.type = "file";
      let that = this;
      editImg.addEventListener("change", function() {
        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        let files = {
          file: file,
          content: reader.result
        };
        that.upload(files, src => {
          this.parentElement.parentElement.querySelector("img").src = src;
        });
      });
      let deleteImg = document.createElement("button");
      deleteImg.innerHTML = "删除";
      deleteImg.classList.add("edit_btn");
      deleteImg.setAttribute("contenteditable", false);
      deleteImg.addEventListener("click", function() {
        that.$dialog
          .confirm({
            title: "提示",
            message: "确定要删除这张图片么？"
          })
          .then(() => {
            deleteImg.parentElement.parentElement.parentElement.removeChild(
              deleteImg.parentElement.parentElement
            );
          })
          .catch(() => {
            // on cancel
          });
        //删除整个容器
      });
      editBtn.appendChild(editImgShow);
      editBtn.appendChild(editImg);
      editBtn.appendChild(deleteImg);
      item.appendChild(editBtn);
    });

    //初始化编辑器
    let that = this;
    //编辑器配置
    var options = {
      debug: "info",
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
    editor.container.firstChild.innerHTML = this.content;

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
        fileInput.setAttribute(
          "accept",
          "image/png, image/jpeg, image/bmp, image/x-icon"
        );
        fileInput.classList.add("ql-image");
        fileInput.addEventListener("change", function() {
          if (fileInput.files != null && fileInput.files[0] != null) {
            //压缩并上传图片
            let file = fileInput.files[0];
            new ImageCompressor(file, {
              width: that.config.outputWidth,
              success(newFile) {
                let formData = new FormData();
                formData.append("file", newFile, Date.now() + ".png");
                let config = {
                  headers: { "Content-Type": "multipart/form-data" }
                };
                that.http.resource
                  .uploadImg(formData, "post", config)
                  .then(res => {
                    let imgSrc = res.data.src[0];
                    var range = editor.getSelection(true);
                    editor.insertEmbed(range.index, "image", imgSrc);
                    editor.setSelection(range.index + 1);
                  });
              }
            });
          }
        });
        this.container.appendChild(fileInput);
      }
      fileInput.click();
    });
  },
  methods: {
    shareImgClick() {
      this.$router.push("shareImg");
    },
    onRead(file) {
      this.upload(file, src => {
        this.detail.coverImg = src;
        this.$store.commit("setDetail", this.detail);
      });
    },
    next() {
      let content = window.editor.container.firstChild.innerHTML;
      //判断是否可以跳转，单独提示
      if (!this.cover) {
        return this.$toast("需要添加赛事封面");
      }
      if (!this.title) {
        return this.$toast("需要填写赛事名称");
      }
      if (content == "<p><br></p>") {
        return this.$toast("需要填写赛事详情");
      }
      //当保存的时候要将按钮删掉
      let btns = document.querySelectorAll(".edit_cover");
      btns.forEach(item => {
        item.parentElement.removeChild(item);
      });
      this.detail.title = this.$refs.title.innerHTML;
      this.detail.content = content;
      this.$store.commit("setDetail", this.detail);
      this.$router.push("style");
    },
    contentFocus() {
      this.appendShow = true;
    },
    contentBlur() {
      this.appendShow = false;
    },
    append(file) {
      let containDom = this.$refs.createIntro;
      let div = document.createElement("div");
      div.style.position = "relative";
      div.style.marginBottom = "0.2rem";
      div.classList.add("img_content");
      let img = document.createElement("img");
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
    },
    saveClick() {
      this.detail.title = this.$refs.title.innerHTML;
      this.detail.content = window.editor.container.firstChild.innerHTML;
      this.$store.commit("setDetail", this.detail);
      this.submit(0);
    },
    checkClick() {
      let content = window.editor.container.firstChild.innerHTML;
      //判断是否可以跳转，单独提示
      if (!this.cover) {
        return this.$toast("需要添加赛事封面");
      }
      if (!this.title) {
        return this.$toast("需要填写赛事名称");
      }
      if (content == "<p><br></p>") {
        return this.$toast("需要填写赛事详情");
      }
      //当保存的时候要将按钮删掉
      let btns = document.querySelectorAll(".edit_cover");
      btns.forEach(item => {
        item.parentElement.removeChild(item);
      });
      this.detail.title = this.$refs.title.innerHTML;
      this.detail.content = content;
      this.$store.commit("setDetail", this.detail);
      this.submit(1);
    },
    submit(type) {
      let isEdit = this.$store.state.match.isEdit;
      let action = "createMatch";
      let match = this.$store.state.match;
      let detail = match.detail;
      let gameName = match.gameName;
      //如果没有奖品的话则传空对象
      let rankingSet = match.rankPrize;
      if (!match.ifSave && !isEdit) {
        rankingSet = {};
      }
      let params = {
        isAudit: type,
        title: detail.title,
        cover: detail.coverImg,
        content: detail.content,
        gameId: gameName.id,
        beginTime: match.time,
        templateId: match.attendPerson.id,
        signupType: match.attendStyle.id,
        prizePic: match.prizeCover,
        getPrizeWay: match.sendStyle,
        address: match.gainPrizeAddress.address,
        regionName: match.gainPrizeAddress.regionName,
        provinceId: match.gainPrizeAddress.provinceId,
        cityId: match.gainPrizeAddress.cityId,
        areaId: match.gainPrizeAddress.areaId,
        rankingSet: rankingSet,
        sharePic: match.shareImg,
        shareCropImg: match.shareCropImg
      };
      if (isEdit) {
        action = "editMatch";
        params.id = match.id;
      }
      this.http.match[action](params).then(res => {
        if (!this.isPublish) {
          return this.$router.go(-1);
        }
        if (isEdit) {
          this.$router.go(-3);
        } else {
          this.$router.go(-2);
        }
      });
    }
  }
};
</script>

<style>
#editor {
  text-indent: 2em;
  text-align: left;
  height: 100%;
}
.exit {
  display: none;
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  width: 40%;
  border: 0.02rem solid #ffd321;
  transform: translate(-50%);
}
.content img {
  width: 100%;
}
.edit_cover {
  position: absolute;
  right: 0.2rem;
  bottom: 0.15rem;
  display: flex;
  flex-direction: column;
}
.edit_btn {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0.1rem 0.1rem 0.2rem #000;
  color: #ffde00;
  margin-bottom: 0.25rem;
  padding: 0.1rem 0.3rem;
  max-width: 1.8rem;
}
.edit_input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>
<style scoped>
/* 距离顶部高度 */
.title {
  position: relative;
}
.title,
.content {
  margin-top: 0.01rem;
}
.edit {
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
}
.cover {
  background-color: #fff;
  height: 3.4rem;
  padding: 0.3rem 0;
  position: relative;
  text-align: center;
}
.cover img {
  height: 100%;
  max-width: 100%;
}
.cover_edit {
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0.1rem 0.1rem 0.2rem #000;
  color: #ffde00;
  font-size: 0.25rem;
  padding: 0.2rem 0.55rem;
  position: absolute;
  bottom: 0.2rem;
  right: 0.2rem;
}
.title {
  background-color: #fff;
  padding: 0.25rem 0.3rem;
}
.title span:first-child {
  color: #000;
  font-size: 0.3rem;
  margin-right: 0.3rem;
}
.content {
  background-color: #fff;
  flex-basis: 0;
  flex-grow: 1;
  padding: 0 0.2rem 2rem 0;
  overflow-y: auto;
  overflow-x: hidden;
  text-indent: 2em;
}
.btn {
  background-color: #fff;
  padding: 0.2rem 0;
  position: absolute;
  bottom: 0;
  left: 0;
  text-align: center;
  width: 100%;
}
.btn button {
  font-size: 0.35rem;
  margin: 0 0.45rem;
  padding: 0.25rem 0;
  width: 2.35rem;
}
.btn button:first-child {
  background-color: #ffde00;
}
.btn button:nth-child(2) {
  border: 0.01rem solid #ffde00;
}
.can-edit {
  outline: none;
}
.append {
  color: red;
  position: fixed;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}
.footer button {
  font-size: 0.35rem;
  margin: 0 0.45rem;
  padding: 0.2rem 0;
  width: 2.35rem;
}
.footer button:first-child {
  background-color: #ffde00;
}
.footer button:nth-child(2) {
  background-color: #000;
  color: #ffd321;
}
.editor {
  flex-basis: 0;
  flex-grow: 1;
  overflow: auto;
  font-size: 0.28rem;
}
</style>

