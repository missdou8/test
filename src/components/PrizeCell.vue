<template>
  <div class="cell">
    <div class="cell_content_group">
      <span class="cell_rank">{{cellData.beginRank}}</span>
      <div class="cell_content">
        <div class="content_img-container">
          <img src="../assets/add.png" alt>
        </div>
        <div class="content_detail">
          <p>这里是名字</p>
          <p>这里是数量</p>
        </div>
      </div>
    </div>
    <button class="cell_edit" @click="toEdit">编辑</button>
    <p class="cell_sum">
      <span>有参与奖</span>
      <span>共66元</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["cellData"],
  mounted() {},
  methods: {
    toEdit() {
      this.$router.push("/match/style/prizepreview/prizesetting");
    }
  }
};
</script>


<style scoped>
.cell {
  position: relative;
}
.cell_content_group {
  display: flex;
  align-items: center;
}
.cell_rank {
  width: 1.35rem;
  text-align: center;
}
.cell_content {
  display: flex;
}
.content_img-container {
  width: 1.35rem;
  height: 1.35rem;
}
.cell_content img {
  width: 1.32rem;
}
.content_detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.cell_sum {
  padding-left: 100px;
}
.cell_sum span {
  display: inline-block;
  width: 50%;
}
.cell_edit {
  position: absolute;
  right: 5px;
  top: 5px;
}
</style>

