<template>
  <div id="number">
    <div :id="index" v-for="(item,index) in 10000" :key="`${index}`" @click="select(item)">
      <p
        value="开赛人数"
        :class="{
      disable: item<= fromIndex && type!='count',
      show_select: index == selected,
      min_player: attendPerson-1 == index
    }"
      >{{item}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      fromIndex: 1,
      selected: -1,
      type: ""
    };
  },
  computed: {
    ...mapState({
      currentData(state) {
        console.log("年后");
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
#number div {
  margin: 0.2rem 0;
  height: 0.42rem;
  line-height: 0.42rem;
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
  padding-bottom: 0.1rem;
  color: #d83c3c;
}
.min_player::after {
  content: attr(value);
  font-size: 0.18rem;
  line-height: 0.27rem;
  color: #d83c3c;
}
</style>

