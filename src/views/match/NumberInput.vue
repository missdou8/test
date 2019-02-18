<template>
  <div id="number">
    <van-list class="list" v-model="loading" :finished="finished" finished-text @load="onLoad">
      <div
        class="list_item"
        :class="{ min_player: attendPerson-1 == index &&type!='count'}"
        :id="index"
        v-for="(item,index) in numTotal"
        :key="`${index}`"
        @click="select(item)"
        value="开赛人数"
      >
        <p
          :class="{
      disable: item<= fromIndex && type!='count',
      show_select: index == selected,
     
    }"
        >{{item}}</p>
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
      type: "",
      loading: false,
      finished: false,
      numTotal: 0
    };
  },
  computed: {
    ...mapState({
      currentData(state) {
        return state.match.currentRankData;
      },
      attendPerson(state) {
        return state.match.attendPerson.minPlayer;
      }
    })
  },
  mounted() {
    this.fromIndex = this.$route.query.fromIndex;
    this.type = this.$route.query.type;
    location.href = `#${this.fromIndex - 8}`;
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
      if (item <= this.fromIndex && this.type != "count") {
        return;
      }
      this.selected = item - 1;
      //修改奖品数据
      let index = this.$route.query.index;
      let data = this.currentData;
      if (this.type === "count") {
        data.prizes[index].prizeCount = item;
      } else {
        data.endRank = item;
      }
      this.$store.commit("setCurrentRankData", data);
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
  margin: 0.2rem 0;
  height: 0.42rem;
  line-height: 0.42rem;
  width: 16.6%;
  text-align: center;
}
#number p {
  display: inline-block;
  text-align: center;
  width: 0.42rem;
  height: 0.42rem;
  line-height: 0.42rem;
}
.disable {
  color: #ededed;
}
.show_select {
  background-color: red;
  border-radius: 50%;
  color: #fff;
}
.min_player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.1rem;
  color: #d83c3c;
}
.min_player::after {
  content: attr(value);
  font-size: 0.18rem;
  line-height: 0.27rem;
  color: #d83c3c;
  width: 1rem;
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>

