<template>
  <div class="cell">
    <div class="cell_content_group">
      <span class="cell_rank">{{cellData.beginRank}}</span>
      <div class="cell_content">
        <div class="content_detail">
          <div class="detail_cell" v-for="(item, index) in cellData.prizes" :key="`prize${index}`">
            <div class="content_img-container">
              <img src="../assets/add.png" alt>
            </div>
            <div class="cell_desc">
              <p>{{item.name}}</p>
              <p class="detail_num">{{item.prizeCount}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="cell_edit" @click="toEdit"></button>
    <p class="cell_sum">
      <span :class="{show: !cellData.ispartInPrize}">有参与奖</span>
      <span>共{{total}}元</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["cellData"],
  mounted() {},
  computed: {
    total() {
      return this.cellData.prizes.reduce((prev, cur) => {
        return prev + cur.price;
      }, 0);
    }
  },
  methods: {
    toEdit() {
      this.$router.push("/match/style/prizepreview/prizesetting");
    }
  }
};
</script>


<style scoped>
.cell {
  padding: 0.24rem 0;
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
  padding: 0.1rem;
  height: 1.35rem;
  width: 1.35rem;
  margin-right: 0.2rem;
}
.cell_content img {
  max-height: 100%;
  max-width: 100%;
}
.content_detail {
  display: flex;
  flex-direction: column;
}
.detail_cell {
  display: flex;
  align-items: center;
}
.detail_cell p {
  margin-bottom: 0.1rem;
}
.cell_desc {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
}
.detail_num {
  color: #c64432;
  font-size: var(--font-size-smaller);
}
.cell_sum {
  padding-left: 2.9rem;
  display: flex;
  justify-content: space-between;
}
.cell_edit {
  background: url("../assets/prize_edit_icon.png") no-repeat;
  background-size: cover;
  position: absolute;
  right: 0.36rem;
  top: 0.6rem;
  height: 0.3rem;
  width: 0.3rem;
}
.show {
  opacity: 0;
}
</style>

