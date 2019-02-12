<template>
  <div class="cell">
    <div class="cell_content_group">
      <span
        class="cell_rank"
      >第{{cellData.beginRank}}{{cellData.beginRank != cellData.endRank ? `-${cellData.endRank}`: ''}}名</span>
      <div class="cell_content">
        <div class="content_detail">
          <div class="detail_cell" v-for="(item, index) in cellData.prizes" :key="`prize${index}`">
            <div class="content_img-container">
              <img :src="item.icon || defaultPrizeIcon" alt>
            </div>
            <div class="cell_desc">
              <p>{{item.name || '暂无奖品'}}</p>
              <p class="detail_num">{{item.prizeCount || 0}}</p>
              <p class="cell_sum">
                <span :class="{show: !cellData.ispartInPrize}">有参与奖</span>
                <span>共{{total}}元</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="cell_edit" @click="toEdit" v-if="edit"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPrizeIcon: require("../assets/prize_default_icon.png")
    };
  },
  props: ["cellData", "edit"],
  mounted() {},
  computed: {
    total() {
      return this.cellData.prizes.reduce((prev, cur) => {
        return prev + Number(cur.price);
      }, 0);
    }
  },
  methods: {
    toEdit() {
      this.$emit("toEdit");
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
  flex-grow: 1;
}
.content_img-container {
  padding: 0.1rem;
  height: 1.35rem;
  line-height: 1.35rem;
  width: 1.35rem;
  margin-right: 0.2rem;
  position: relative;
}
.cell_content img {
  max-height: 100%;
  max-width: 100%;
}
.content_detail {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.detail_cell {
  display: flex;
  align-items: center;
  flex-grow: 1;
}
.detail_cell p {
  margin-bottom: 0.1rem;
}
.cell_desc {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  flex-grow: 1;
}
.detail_num {
  color: #c64432;
  font-size: var(--font-size-smaller);
}
.cell_sum {
  display: flex;
  justify-content: space-around;
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

