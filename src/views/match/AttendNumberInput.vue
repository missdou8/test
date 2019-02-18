<template>
  <div id="number">
    <van-list class="list" v-model="loading" :finished="finished" finished-text @load="onLoad">
      <div
        class="list_item"
        v-for="(item,index) in numTotal"
        :key="`${index}`"
        @click="select(item)"
      >
        <span :class="{
      show_select: index == selected
    }">{{item}}</span>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fromIndex: 1,
      selected: -1,
      loading: false,
      finished: false,
      numTotal: 0
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
    onLoad() {
      this.loading = false;
      if (this.numTotal >= 9900) {
        return (this.finished = true);
      }
      this.numTotal += 101;
    },
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
#number .list_item {
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
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>

