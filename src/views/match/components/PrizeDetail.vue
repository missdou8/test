<template>
  <div class="detail">
    <div class="prize_rank">
      <div class="rank">
        <span class="detail_title">名次</span>
        <div class="detail_rank">
          第
          <span class="rank_from">{{rankData.beginRank}}</span>名&emsp;— &emsp;
          <div :class="{canMutilple: mutipleChoose}">
            第
            <button
              class="btn"
              @click="numInput('endRank',rankData.beginRank)"
            >{{rankData.endRank != rankData.beginRank ? rankData.endRank :'点击选择'}}</button>
            名
          </div>
        </div>
      </div>
      <div class="rank_multiple">
        <van-checkbox v-model="checked" @change="change" checked-color="#07c160">多人获得</van-checkbox>
      </div>
    </div>
    <div class="mutiple_prize" v-for="(prize,index) in rankData.prizes" :key="`prize${index}`">
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
        <button
          class="choose_btn"
          :class="{choose_btn_gray: !prize.prizeCount}"
          @click="numInput('count',1, index)"
        >{{prize.prizeCount ? prize.prizeCount:'点击选择'}}</button>
      </div>
      <div class="detail_cell">
        <span class="detail_title">单价</span>
        <input
          type="number"
          class="detail_price"
          :class="{detail_price_hehe: prize.price}"
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
      fromIndex: 0,
      checked: false
    };
  },
  props: ["rankData"],
  computed: {
    deleteShow() {
      return this.rankData.prizes.length > 1;
    },
    mutipleChoose() {
      return !this.checked;
    }
  },
  watch: {
    rankData() {
      if (this.rankData.endRank == this.rankData.beginRank) {
        this.checked = false;
      } else {
        this.checked = true;
      }
    }
  },
  mounted() {
    if (this.rankData.endRank == this.rankData.beginRank) {
      this.checked = false;
    } else {
      this.checked = true;
    }
  },
  methods: {
    numInput(type, fromIndex, index) {
      this.$router.push({
        path: `/match/style/prizepreview/prizesetting/numberInput#${fromIndex -
          8}`,
        query: {
          fromIndex: fromIndex,
          type: type,
          index: index
        }
      });
      if (type == "count") {
        this.$route.meta.title = "请选择数量";
      } else {
        this.$route.meta.title = "请选择名次范围";
      }
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
          data.prizes[index].icon = imgSrc;
          this.rankData = data;
        });
    },
    changeImg(index) {
      this.$refs.detailImgContent[index].click();
    },
    change() {
      !this.checked && (this.rankData.endRank = this.rankData.beginRank);
    },
    deleteClick(index) {
      /**
       * 判断本条目是否有数据
       */
      let data = this.rankData.prizes[index];
      let flag = false;
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (element) {
            flag = true;
          }
        }
      }
      if (flag) {
        this.$dialog1
          .confirm({
            message: "您确定删除这一项奖品配置吗？",
            confirmButtonText: "我确定",
            cancelButtonText: "继续编辑"
          })
          .then(() => {
            this.rankData.prizes.splice(index, 1);
          });
      } else {
        this.rankData.prizes.splice(index, 1);
      }
    }
  }
};
</script>


<style scoped>
.detail_cell {
  background-color: #fff;
  display: flex;
  padding: 0.25rem 0.25rem 0.25rem 0;
  position: relative;
  align-items: center;
}
.detail_cell::after {
  content: "";
  background-color: var(--border-color);
  position: absolute;
  bottom: 0.01rem;
  right: 0;
  transform: scaleY(0.5);
  transform-origin: 0 0;
  height: 1px;
  width: 96%;
}

.detail_title {
  color: #000;
  font-size: var(--font-size-bigger);
  padding: 0 0.36rem 0 0.28rem;
}
.prize_rank {
  background-color: #fff;
  flex-direction: column;
  padding-top: 0.2rem;
}
.rank {
  display: flex;
}
.rank_multiple {
  font-size: 0.32rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem 0.16rem 0.06rem;
}
.rank_multiple input {
  width: 0.38rem;
  height: 0.38rem;
}
.detail_rank {
  display: flex;
  font-size: 0.3rem;
}
.rank_from {
  display: inline-block;
  width: 0.76rem;
  text-align: center;
}
.canMutilple {
  pointer-events: none;
  color: var(--word-gray-color);
}
.detail_img_content {
  display: flex;
  width: 5rem;
  color: #8b8b8b;
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
  flex-grow: 1;
  padding-right: 0.2rem;
}
.detail_price_hehe {
  text-align: right;
}
.detail_icon {
  height: 1.38rem;
  width: 1.38rem;
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
  padding-left: 0;
}
.btn {
  border: 1px solid #ccc;
  width: 1.95rem;
  font-size: 0.27rem;
  margin: 0 0.2rem;
}
.choose_btn {
  background-color: #fafafa;
  padding: 0.12rem 0;
  flex-grow: 1;
}
.choose_btn_gray {
  color: #8b8b8b;
}
</style>

