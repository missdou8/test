<template>
  <div class="detail">
    <div class="prize_rank detail_cell">
      <div class="rank">
        <span class="detail_title">名次</span>
        <div class="detail_rank">
          第
          <span class="rank_from">{{rankData.beginRank}}</span>名 —
          <div :class="{canMutilple: mutipleChoose}">
            第
            <button
              @click="numInput(rankData.beginRank)"
            >{{rankData.endRank != rankData.beginRank ||'点击选择'}}</button>
            名
          </div>
        </div>
      </div>
      <div class="rank_multiple">
        <input type="checkbox" @change="mutipleClick">多人获得
      </div>
    </div>
    <div class="mutiple_prize" v-for="(prize,index) in rankData.prizes" :key="`prize${index}`">
      <div class="detail_cell">
        <span class="detail_title">名称</span>
        <input type="text" placeholder="请输入不超过15个字符" :value="prize.name">
      </div>
      <div class="detail_cell">
        <span class="detail_title">图片</span>
        <input type="text" placeholder="请点击添加图片" :value="prize.icon">
      </div>
      <div class="detail_cell">
        <span class="detail_title">数量</span>
        <span v-if="prize.prizeCount">{{prize.prizeCount}}</span>
        <button v-else>点击选择</button>
      </div>
      <div class="detail_cell">
        <span class="detail_title">单价</span>
        <input type="text" placeholder="请输入阿拉伯数字，可带有小数点">元
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromIndex: 0,
      mutipleChoose: true
    };
  },
  props: ["rankData"],
  watch: {
    /**
     * 当数据变化时初始化本组件数据
     */
    rankData(val) {
      console.log("你好");
      console.log(val);
    }
  },
  mounted() {},
  methods: {
    numInput(fromIndex) {
      this.$router.push({
        path: "/match/style/prizepreview/prizesetting/numberInput",
        query: {
          fromIndex: fromIndex
        }
      });
    },
    mutipleClick(event, value) {
      let dom = event.target;
      this.mutipleChoose = !dom.checked;
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
}
.detail_cell::after {
  content: "";
  background-color: var(--border-color);
  position: absolute;
  bottom: 0;
  right: 0;
  height: 0.012rem;
  width: 97%;
}
.detail_cell:first-child {
  margin-bottom: 0.15rem;
}
.detail_title {
  font-size: var(--font-size-bigger);
  padding: 0 0.4rem;
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
  align-items: center;
}
.detail_rank {
  display: flex;
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
</style>

