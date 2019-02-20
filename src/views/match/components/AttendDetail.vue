<template>
  <div class="detail">
    <div class="mutiple_prize" v-for="(prize,index) in rankData" :key="`prize${index}`">
      <div class="detail_cell cell_name">
        <span class="detail_title">名称</span>
        <input type="text" placeholder="请输入不超过15个字符" v-model="prize.name" maxlength="15">
      </div>
      <div class="detail_cell">
        <span class="detail_title">图片</span>
        <img
          class="detail_icon"
          v-show="prize.icon"
          :src="prize.icon"
          alt="奖品图片"
          @click="changeImg(index)"
        >
        <label class="detail_img_content" ref="detailImgContent" v-show="!prize.icon">
          <span>点击添加图片</span>
          <input
            class="detail_img"
            type="file"
            placeholder="请点击添加图片"
            @change="addImg($event,index)"
          >
        </label>
      </div>
      <div class="detail_cell">
        <span class="detail_title">数量</span>
        <span
          class="detail_count_num"
          v-if="prize.prizeCount"
          @click="numInput('count',1, index)"
        >{{prize.prizeCount}}</span>
        <button class="choose_btn" v-else @click="numInput('count',1, index)">点击选择</button>
      </div>
      <div class="detail_cell">
        <span class="detail_title">单价</span>
        <input
          type="number"
          class="detail_price"
          placeholder="请输入阿拉伯数字，可带有小数点"
          v-model="prize.price"
        >元
      </div>
      <div class="detail_delete" v-if="deleteShow">
        <img src="../../../assets/rank_prize_delete.png" alt="按钮" @click="deleteClick(index)">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromIndex: 0
    };
  },
  props: ["rankData"],
  computed: {
    deleteShow() {
      return this.rankData.length > 1;
    }
  },
  methods: {
    numInput(type, fromIndex, index) {
      this.$router.push({
        path: "/match/style/prizepreview/prizesetting/attendNumberInput",
        query: {
          fromIndex: fromIndex,
          type: type,
          index: index
        }
      });
    },
    addImg(event, index) {
      /**
       * 获取出当前的图片数据，然后修改数据
       */
      let dom = event.target;
      let file = dom.files[0];
      file &&
        this.compressAndUpload(file).then(imgSrc => {
          let data = this.rankData;
          data[index].icon = imgSrc;
          this.rankData = data;
        });
    },
    changeImg(index) {
      this.$refs.detailImgContent[index].click();
    },
    deleteClick(index) {
      /**
       * 判断本条目是否有数据
       */
      let data = this.rankData[index];
      let flag = false;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (!element && element !== 0) {
            flag = true;
          }
        }
      }
      if (flag) {
        this.$dialog
          .confirm({
            message: "您确定删除这一项奖品配置吗？",
            confirmButtonText: "我确定",
            cancelButtonText: "继续编辑"
          })
          .then(() => {
            this.rankData.splice(index, 1);
          });
      }
    }
  }
};
</script>


<style scoped>
.detail_cell {
  background-color: #fff;
  display: flex;
  padding: 0.25rem 0;
  position: relative;
  align-items: center;
}
.detail_cell::after {
  content: "";
  background-color: var(--border-color);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 1px;
  width: 90%;
}

.detail_title {
  font-size: var(--font-size-bigger);
  padding: 0 0.4rem;
}
.rank_from {
  display: inline-block;
  width: 0.5rem;
  text-align: center;
}
.canMutilple {
  pointer-events: none;
  color: var(--word-gray-color);
}
.detail_img_content {
  display: flex;
  width: 5rem;
}
.detail_img_content span,
.detail_img {
  flex-basis: 0;
  flex-grow: 1;
}
.detail_img_content span {
  background: url("../../../assets/add_prize_img.png") no-repeat;
  background-size: 0.44rem 0.38rem;
  background-position: 1px 1px;
  padding-left: 0.5rem;
}
.detail_img {
  opacity: 0;
  width: 1rem;
}
.detail_price {
  width: 5rem;
}
.detail_icon {
  height: 1.4rem;
  width: 1.4rem;
  object-fit: contain;
}
.mutiple_prize {
  margin-top: 0.16rem;
}
.detail_delete {
  background-color: #fff;
  padding: 0.2rem 0;
  text-align: right;
}
.detail_delete img {
  margin-right: 0.2rem;
  width: 0.35rem;
  vertical-align: top;
}
.cell_name input,
.detail_count_num {
  flex-grow: 1;
}
.choose_btn {
  background-color: #fafafa;
  padding: 0.02rem 2rem;
}
</style>

