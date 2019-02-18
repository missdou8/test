<template>
  <div class="cell">
    <div class="cell_content_group">
      <span class="cell_rank">{{rank}}</span>
      <div class="cell_content">
        <div class="content_detail">
          <div class="detail_cell" v-for="(item, index) in truePrizes" :key="`prize${index}`">
            <div class="content_img-container">
              <img class="cell_content_icon" :src="item.icon || defaultPrizeIcon" alt>
            </div>
            <div class="cell_desc">
              <p>{{item.name || '暂无奖品'}}</p>
              <p class="detail_num">{{item.prizeCount || 0}}</p>
            </div>
          </div>
          <div class="pull_down" v-if="showMore">
            <img src="../assets/pull_down_img.png" @click="showMoreClick">
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="cell_sum">
        <span :class="{show: !cellData.ispartInPrize}">有参与奖</span>
        <span>共{{total}}元</span>
      </p>
    </div>
    <button class="cell_edit" @click="toEdit" v-if="edit"></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPrizeIcon: require("../assets/prize_default_icon.png"),
      truePrizes: [this.cellData.prizes[0]],
      showMore: false
    };
  },
  props: ["cellData", "edit"],
  watch: {
    cellData() {
      if (this.cellData.prizes.length > 1 ? true : false) {
        this.showMore = true;
      }
      if (this.edit == true) {
        this.showMore = false;
        this.truePrizes = this.cellData.prizes;
      }
    }
  },
  mounted() {
    if (!this.edit && this.cellData.prizes.length > 1) {
      this.showMore = true;
    }
    if (this.edit == true) {
      this.truePrizes = this.cellData.prizes;
    }
  },
  computed: {
    total() {
      return this.cellData.prizes.reduce((prev, cur) => {
        return prev + Number(cur.price) * Number(cur.prizeCount);
      }, 0);
    },
    rank() {
      if (
        (this.cellData.beginRank == this.cellData.endRank) == 1 &&
        !this.cellData.prizes[0].name
      ) {
        return "名次无";
      } else {
        return `第${this.cellData.beginRank}${
          this.cellData.beginRank != this.cellData.endRank
            ? -this.cellData.endRank
            : ""
        }名`;
      }
    }
  },
  methods: {
    toEdit() {
      this.$emit("toEdit");
    },
    showMoreClick() {
      this.truePrizes = this.cellData.prizes;
      this.showMore = false;
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
.cell_content_icon {
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  justify-content: space-between;
  padding-left: 3rem;
  padding-right: 0.2rem;
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
.pull_down img {
  height: 0.4rem;
  transform: rotate(90deg);
  margin-left: 2rem;
  margin-top: 0.1rem;
}
</style>

