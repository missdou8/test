<template>
  <div class="games">
    <select-cell
      class="cell"
      v-for="(item,index) in lists"
      :key="`game${index}`"
      @cellSelected="selected"
      :game="item.name"
      :index="index"
      :selected="selectedIndex"
      :class="{top: index==lists.length-1}"
    ></select-cell>
  </div>
</template>


<script>
import SelectCell from "../../../components/SelectCell";
export default {
  data() {
    return {
      lists: [],
      selectedIndex: null
    };
  },
  components: {
    SelectCell
  },
  created() {
    this.lists = this.config.loopType;
    //已选中位置
    this.selectedIndex = this.lists.findIndex(item => {
      return item.id == this.$store.state.match.loop.type;
    });
  },
  methods: {
    selected(index) {
      this.selectedIndex = index;
      let loop = this.$store.state.match.loop;
      loop.type = this.lists[index].id;
      this.$store.commit("setLoop", loop);
      this.$router.go(-1);
    }
  }
};
</script>


<style scoped>
.games {
  background-color: #f0f1f2;
}
.cell {
  background-color: #fff;
}
.top {
  margin-top: 0.25rem;
}
</style>
