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
        <input type="text" placeholder="请添加比赛名称" v-model="titlePlace">
      </div>
      <div name="content" id="editor">
      </div>
    </div>
    <div v-show="appendShow" class="append" @click="appendImg">
      <img src="../../assets/add.png" alt="添加图片">
    </div>
    <van-button @click="nextClick" class="next">下一步</van-button>
    <van-button class="exit next">点击退出编辑</van-button>
    <van-uploader class="append_img" :after-read="append">
    </van-uploader>
  </div>
</template>

<script>
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import ImageCompressor from "image-compressor.js";
import axios from "axios";
import { isIos } from "lputils";
export default {
  data() {
    return {
      titlePlace: this.$store.state.match.detail.title,
      contentPlace: this.$store.state.match.detail.content || "请添加图文介绍",
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
    let that = this;
    class UploadAdapter {
      constructor(loader) {
        this.loader = loader;
      }
      upload() {
        let file = this.loader.file;
        return new Promise((resolve, reject) => {
          let uploadImgMethod = f => {
            const data = new FormData();
            const config = {
              headers: { "content-type": "multipart/form-data" }
            };
            data.append("file", f, f.name);
            axios
              .post("/api/resource/uploadImg", data, config)
              .then(response => {
                that.$toast("图片后输入文字需按回车键");
                resolve({
                  default: response.data.data.src[0]
                });
              });
          };
          // 压缩图片
          let maxSize = 500 * 1024;
          let imgSize = file.size;
          if (imgSize > maxSize) {
            let radio = maxSize / imgSize;
            new ImageCompressor(file, {
              quality: radio,
              convertSize: 1000000,
              success(newFile) {
                let formData = new FormData();
                formData.append("file", newFile, Date.now() + ".png");
                let config = {
                  headers: { "Content-Type": "multipart/form-data" }
                };
                that.http.resource
                  .uploadImg(formData, "post", config)
                  .then(res => {
                    let data = res.data.src[0];
                    that.$toast("图片后输入文字需按回车键");
                    resolve({
                      default: data
                    });
                  });
              }
            });
            return;
          }
          uploadImgMethod(file);
        });
      }
      abort() {
        //
      }
    }
    //初始化编辑器
    InlineEditor.create(document.querySelector("#editor"), {
      toolbar: ["imageUpload"],
      removePlugins: ["imageCaption", "imageTextAlternative"],
      image: {
        toolbar: []
      }
    })
      .then(editor => {
        window.editor = editor;
        //监听事件
        isIos() ||
          editor.editing.view.document.on(
            "change:isFocused",
            (evt, name, value) => {
              if (value) {
                document.querySelector(".uploader").style.display = "none";
                let next = document.querySelector(".next");
                next.style.display = "none";
                document.querySelector(".exit").style.display = "block";
              } else {
                let next = document.querySelector(".next");
                next.style.display = "block";
                document.querySelector(".exit").style.display = "none";
                document.querySelector(".uploader").style.display = "block";
              }
            }
          );
        // 转化html
        const viewFragment = editor.data.processor.toView(this.contentPlace);
        const modelFragment = editor.data.toModel(viewFragment);
        editor.model.insertContent(
          modelFragment,
          editor.model.document.selection
        );

        editor.model.document.on("change:data", () => {
          let target = document.querySelector("#editor");
          if (target.lastElementChild.nodeName != "BR") {
            target.appendChild(document.createElement("br"));
          }
        });

        //初始化上传方法
        editor.plugins.get("FileRepository").createUploadAdapter = loader => {
          return new UploadAdapter(loader);
        };
      })
      .catch(error => {});
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
    contentFocus(content, evt) {
      this.appendShow = true;
      //如果存在默认文字，那么清空
      if (evt.target.innerHTML == "请添加图文介绍") {
        evt.target.innerHTML = "";
      }
    },
    contentBlur(content, evt) {
      this.appendShow = false;
      if (evt.target.innerHTML == "") {
        evt.target.innerHTML = "请添加图文介绍";
      }
    },
    nextClick() {
      //标题和内容
      let title = this.titlePlace;
      let content = window.editor.getData();
      //TODO: 提示是否有更好的方法
      //判断是否可以跳转，单独提示
      if (!this.coverImg) {
        return this.$toast("需要添加赛事封面");
      }
      if (!title) {
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
    /**
     * 所有插入图片操作共用一个方法
     * 1. 将图片插入当前光标所在处
     * 2. 替换当前选中的图片
     */
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
#editor {
  text-indent: 2em;
  text-align: left;
  height: 100%;
}
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
  padding: 0.3rem;
  padding-bottom: 1.5rem;
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
.create_content_intro {
  flex-grow: 1;
  flex-basis: 0;
  text-indent: 2em;
  user-select: initial;
  margin-top: 0.2rem;
  overflow: auto;
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
  position: absolute;
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
.append_img {
  position: absolute;
  left: 1000px;
  top: 1000px;
  opacity: 0;
}
</style>

