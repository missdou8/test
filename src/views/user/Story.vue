<template>
  <div id="create">

    <div class="uploader" @click="onRead">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加故事封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
    </div>
    <div name="content" id="editor">
    </div>
    <van-uploader class="append_img" :after-read="append">
    </van-uploader>
    <van-button @click="nextClick" class="next">完成</van-button>
    <van-button class="exit next">点击退出编辑</van-button>
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
      titlePlace: "添加比赛名称",
      contentPlace: "请添加图文介绍",
      coverImg: "",
      uploadType: "append",
      replaceDom: ""
    };
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
    this.fetchInfo().then(data => {
      InlineEditor.create(document.querySelector("#editor"), {
        toolbar: ["imageUpload"]
      })
        .then(editor => {
          window.editor = editor;
          const content = data;
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
          const viewFragment = editor.data.processor.toView(content);
          const modelFragment = editor.data.toModel(viewFragment);
          editor.model.insertContent(
            modelFragment,
            editor.model.document.selection
          );
          editor.model.document.on("change:data", () => {
            let lastEle = document.querySelector("#editor").lastElementChild;
            if (lastEle.innerHTML == "image widget") {
              lastEle = lastEle.previousElementSibling;
            }
            if (
              lastEle.innerHTML != '<br data-cke-filler="true">' &&
              lastEle.innerHTML != "请添加图文介绍"
            ) {
              editor.model.change(writer => {
                let root = editor.model.document.getRoot();
                writer.insertElement("paragraph", root, "end", {
                  class: "last"
                });
              });
            }
          });
          //初始化上传方法
          editor.plugins.get("FileRepository").createUploadAdapter = loader => {
            return new UploadAdapter(loader);
          };
        })
        .catch(error => {});
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
        this.contentPlace = data.content || "请添加图文介绍";
        return this.contentPlace;
      });
    },
    onRead(file) {
      this.uploadType = "upload";
      let input = document.querySelector(".van-uploader__input");
      input.click();
    },
    nextClick() {
      this.http.user
        .setShopInfo({
          cover: this.coverImg,
          content: window.editor.getData()
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
  padding-bottom: 1.5rem;
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
  left: 0px;
  top: 0px;
  opacity: 0;
  z-index: -1000;
}
</style>

