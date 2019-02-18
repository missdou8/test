<template>
  <div id="number">
    <div v-for="(item,index) in 10000" :key="`${index}`" @click="select(item)">
      <span :class="{
      show_select: index == selected
    }">{{item}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fromIndex: 1,
      selected: -1
    };
  },
  computed: {
    ...mapState({
      currentData(state) {
        return state.match.attendCurrentRankData;
      }
    })
  },
  mounted() {
    this.fromIndex = this.$route.query.fromIndex;
  },
  methods: {
    select(item) {
      this.selected = item - 1;
      //修改奖品数据
      let type = this.$route.query.type;
      let index = this.$route.query.index;
      let data = this.currentData;
      if (type === "count") {
        data[index].prizeCount = item;
      } else {
        data.endRank = item;
      }
      this.$store.commit("setAttendCurrentRankData", data);
      setTimeout(() => {
        this.$router.go(-1);
      }, 300);
    }
  }
};
</script>


<style scoped>
#number {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  font-weight: bold;
  font-size: 0.24rem;
  height: 100%;
  overflow: auto;
  color: #000;
}
#number div {
  height: 0.88rem;
  line-height: 0.88rem;
  width: 16.6%;
  text-align: center;
}
#number span {
  display: inline-block;
  text-align: center;
  width: 0.42rem;
  height: 0.42rem;
  line-height: 0.42rem;
}
.show_select {
  background-color: red;
  border-radius: 50%;
  color: #fff;
}
</style>

