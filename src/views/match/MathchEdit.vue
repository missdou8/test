<template>
  <div class="edit">
    <div class="cover">
      <img :src="cover" alt="封面">
      <van-uploader class="cover_edit" :after-read="onRead">修改封面</van-uploader>
    </div>
    <div class="title">
      <span>标题</span>
      <span class="can-edit" ref="title" contenteditable="true">{{title}}</span>
    </div>
    <div contenteditable="true" class="content can-edit" v-html="content" @focus="contentFocus()" @blur="contentBlur()" ref="createIntro">
    </div>
    <van-uploader v-show="appendShow" class="append" :after-read="append">
      <img src="../../assets/img_add.png" alt="添加图片">
    </van-uploader>
    <div class="btn">
      <button @click="next">下一步</button>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      detail: this.$store.state.match.detail,
      appendShow: false
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
  created() {},
  mounted() {
    let imgContentDoms = document.querySelectorAll(".img_content");
    imgContentDoms.forEach(item => {
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
        let files = {
          file: file
        };
        that.upload(files).then(src => {
          this.parentElement.parentElement.querySelector("img").src = src;
          console.log(src);
        });
      });
      let deleteImg = document.createElement("button");
      deleteImg.innerHTML = "删除";
      deleteImg.classList.add("edit_btn");
      deleteImg.setAttribute("contenteditable", false);
      deleteImg.addEventListener("click", function() {
        //删除整个容器
        deleteImg.parentElement.parentElement.parentElement.removeChild(
          deleteImg.parentElement.parentElement
        );
      });
      editBtn.appendChild(editImgShow);
      editBtn.appendChild(editImg);
      editBtn.appendChild(deleteImg);
      item.appendChild(editBtn);
    });
  },
  methods: {
    onRead(file) {
      this.upload(file).then(src => {
        this.detail.coverImg = src;
        this.$store.commit("setDetail", this.detail);
      });
    },
    next() {
      //当保存的时候要将按钮删掉
      let btns = document.querySelectorAll(".edit_cover");
      btns.forEach(item => {
        item.parentElement.removeChild(item);
      });
      this.detail.title = this.$refs.title.innerHTML;
      this.detail.content = this.$refs.createIntro.innerHTML;
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
      this.upload(file).then(src => {
        img.src = src;
      });
      //获取光标位置
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      let elem = range.commonAncestorContainer;
      if (elem == this.$refs.createIntro) {
        return containDom.appendChild(div);
      }
      if (elem.parentElement == this.$refs.createIntro) {
        return containDom.insertBefore(div, elem.nextSibling);
      }
      if (elem.nodeType != 1) {
        elem = elem.parentNode;
      }
      this.$refs.createIntro.insertBefore(div, elem);

      // if (containDom.lastChild == elem) {
      //   containDom.appendChild(div);
      // } else {
      //   containDom.insertBefore(div, elem.nextSibling);
      // }
    }
  }
};
</script>

<style>
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
.title,
.content {
  margin-top: 0.01rem;
}
.edit {
  display: flex;
  flex-direction: column;
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
  padding-bottom: 2rem;
  overflow-y: auto;
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
</style>

