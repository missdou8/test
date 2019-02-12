<template>
  <div id="number">
    <span
      v-for="(item,index) in 10000"
      :key="`${index}`"
      :class="{
      disable: item<= fromIndex
    }"
      @click="select(item)"
    >{{item}}</span>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fromIndex: 1
    };
  },
  computed: {
    ...mapState({
      currentData(state) {
        return state.match.currentRankData;
      }
    })
  },
  mounted() {
    this.fromIndex = this.$route.query.fromIndex;
  },
  methods: {
    select(item) {
      if (item <= this.fromIndex) {
        return;
      }
      //修改奖品数据
      let type = this.$route.query.type;
      let index = this.$route.query.index;
      let data = this.currentData;
      if (type === "count") {
        data.prizes[index].prizeCount = item;
      } else {
        data.endRank = item;
      }
      this.$store.commit("setCurrentRankData", data);
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped>
#number {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  overflow: auto;
}
span {
  height: 42px;
  line-height: 42px;
  width: 16.6%;
  text-align: center;
}
.disable {
  color: var(--word-gray-color);
}
</style>

