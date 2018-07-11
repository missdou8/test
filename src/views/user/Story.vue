<template>
  <div class="create">
    <van-uploader class="uploader" :after-read="onRead">
      <div class="addCover" v-show="addShow">
        <p class="add">
          <span class="add_img"></span>
          <span>添加故事封面</span>
        </p>
      </div>
      <img class="cover-img" :src="coverImg" v-show="!addShow" alt="封面图片">
    </van-uploader>
    <div class="create_content">
      <div class="create_content_intro" contenteditable="true" @focus="contentFocus(contentPlace,$event)" @blur="contentBlur(contentPlace,$event)" ref="createIntro" v-html="contentPlace"></div>
    </div>
    <van-uploader v-show="appendShow" class="append" :after-read="append">
      <img src="../../assets/img_add.png" alt="添加图片">
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
      appendShow: false
    };
  },
  created() {
    this.http.user.getShopInfo().then(res => {
      let data = res.data;
      this.coverImg = data.cover;
      this.contentPlace = data.content || "请添加图文介绍";
      //为input注册事件
      this.$nextTick(() => {
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
      });
    });
  },
  computed: {
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
      let containDom = this.$refs.createIntro;
      let div = document.createElement("div");
      div.style.position = "relative";
      div.classList.add("img_content");
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
      let img = document.createElement("img");
      //插入动作
      div.appendChild(input);
      div.appendChild(img);
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
  bottom: 0.3rem;
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
</style>

