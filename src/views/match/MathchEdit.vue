<template>
    <div class="edit">
        <div class="cover">
            <img src="../../assets/logo.png" alt="封面">
            <van-uploader class="cover_edit">修改封面</van-uploader>
        </div>
        <div class="title">
            <span>标题</span>
            <span>TCL超大屏液晶电视争夺赛</span>
        </div>
        <div class="content">

        </div>
        <div class="btn">
            <button>保存</button>
            <button>申请修改</button>
        </div>
    </div>
</template>


<script>
export default {
  mounted() {
    let imgContentDoms = document.querySelectorAll(".img_content");
    imgContentDoms.forEach(item => {
      let editBtn = document.createElement("div");
      let editImg = document.createElement("button");
      editImg.addEventListener("click", function() {
        console.log(" 编辑图片");
      });
      let deleteImg = document.createElement("button");
      deleteImg.addEventListener("click", function() {
        console.log("删除图片");
      });
      editBtn.appendChild(editImg);
      editBtn.appendChild(deleteImg);
      item.appendChild(editBtn);
    });
  }
};
</script>


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
  flex-basis: 0;
  flex-grow: 1;
  padding-bottom: 2rem;
}
.btn {
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
</style>

