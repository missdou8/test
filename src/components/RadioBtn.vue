<template>
  <div>
    <button class="btn" :class="{active: index== select, default: index!==select}" v-for="(item,index) in data" :id="item.id" @click="radioClick(item, index)">{{item.value}}</button>
  </div>
</template>

<script>
export default {
  props: ["data", "selected"],
  data() {
    return {
      select: -1
    };
  },
  mounted() {
    this.select = this.selected;
  },
  methods: {
    radioClick(data, index) {
      this.select = index;
      this.$emit("select", data);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-right: 0.25rem;
  margin: 0.15rem 0.25rem 0.15rem 0;
  padding: 0.15rem 0.5rem;
}
.active {
  background-color: #fcc600;
}
.default {
  border: 0.01rem solid #e1e1e1;
}
</style>


