<template>
  <div class="detail">
    <div class="prize_rank detail_cell">
      <div class="rank">
        <span class="detail_title">名次</span>
        <p>
          第
          <span>{{fromIndex}}</span>名——第
          <button @click="numInput(data.fromIndex)">{{data.endIndex ||'点击选择'}}</button>
          名
        </p>
      </div>
      <div class="rank_multiple">
        <input type="checkbox">多人获得
      </div>
    </div>
    <div class="detail_cell">
      <span class="detail_title">名称</span>
      <input type="text" placeholder="请输入不超过15个字符" :value="data.prizeTitle">
    </div>
    <div class="detail_cell">
      <span class="detail_title">图片</span>
      <input type="text" placeholder="请点击添加图片" :value="data.imgSrc">
    </div>
    <div class="detail_cell">
      <span class="detail_title">数量</span>
      <span v-if="data.prizeNum">{{data.prizeNum}}</span>
      <button v-else>点击选择</button>
    </div>
    <div class="detail_cell">
      <span class="detail_title">单价</span>
      <input type="text" placeholder="请输入阿拉伯数字，可带有小数点">元
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromIndex: 0,
      data: {}
    };
  },
  props: ["currentIndex"],
  mounted() {
    /**
     * 判断是添加还是编辑
     * 没有奖品就填写
     */
    if (this.data.beginRank == 0) {
      this.fromIndex = this.currentIndex;
    }
  },
  methods: {
    numInput(fromIndex) {
      this.$router.push({
        path: "/match/style/prizepreview/prizesetting/numberInput",
        query: {
          fromIndex: fromIndex
        }
      });
    }
  }
};
</script>


<style scoped>
.detail_cell {
  background-color: #fff;
  display: flex;
  padding: 0.25rem 0 0.25rem 0.25rem;
  position: relative;
}
.detail_cell::after {
  content: "";
  background-color: var(--border-color);
  position: absolute;
  bottom: 0;
  right: 0;
  height: 0.01rem;
  width: 97%;
}
.detail_cell:first-child {
  margin-bottom: 0.15rem;
}
.detail_title {
  font-size: var(--font-size-bigger);
  padding: 0 0.1rem;
}
.prize_rank {
  flex-direction: column;
}
.rank {
  display: flex;
}
.rank_multiple {
  display: flex;
  justify-content: flex-end;
}
</style>

