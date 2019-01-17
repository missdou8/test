<template>
  <div class="detail">
    <div class="prize detail_cell">
      <span class="detail_title">名次</span>
      <p>
        第
        <span>{{data.fromIndex}}</span>名——第
        <button @click="numInput(data.fromIndex)">{{data.endIndex ||'点击选择'}}</button>
        名
      </p>
      <input type="checkbox">多人获得
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
    return {};
  },
  props: ["data"],
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
  padding: 6px 0;
}
.detail_cell:first-child {
  margin-bottom: 10px;
}
.detail_title {
  font-size: 20px;
  padding: 0 6px;
}
</style>

