<template>
  <div class="cell" :class="{cell_no: !cellData.name}">
    <div class="detail_cell">
      <div class="content_img-container">
        <img :src="cellData.icon || defaultPrizeIcon" alt>
      </div>
      <div class="cell_desc">
        <p>{{cellData.name || '暂无奖品'}}</p>
        <p class="detail_num">
          <span>{{cellData.prizeCount || 0}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultPrizeIcon: require("../../../assets/prize_default_icon.png")
    };
  },
  props: ["cellData"]
};
</script>


<style scoped>
.cell {
  padding: 0.12rem;
  position: relative;
}
.content_img-container {
  padding: 0.1rem;
  height: 1.35rem;
  line-height: 1.35rem;
  width: 1.35rem;
  margin-right: 0.2rem;
  position: relative;
}
.content_img-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
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
  display: flex;
  justify-content: space-between;
}
.cell_no {
  background-color: #f9f9f9;
  border: 1px dashed #d8d8d8;
}
</style>

