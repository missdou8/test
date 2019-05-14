<template>
  <div class="border_bottom" :class="{selected: selected==index}" @click="select">{{game}}</div>
</template>

<script>
export default {
  props: ["game", "index", "selected"],
  methods: {
    select() {
      this.$emit("cellSelected", this.index);
    }
  }
};
</script>


<style scoped>
div {
  padding: 0.34rem 0.28rem;
}
.selected {
  background: url("../assets/selected.png") no-repeat;
  background-position: 6.45rem center;
  background-size: 0.4rem 0.4rem;
}
</style>
