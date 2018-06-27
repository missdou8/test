<template>
  <div>
    <button class="btn" :class="{active: index== select, default: index!==select}" v-for="(item,index) in data" :id="item.id" @click="radioClick(item.id, index)">{{item.value}}</button>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      select: 0
    };
  },
  methods: {
    radioClick(id, index) {
      this.select = index;
      this.$emit("select", id);
    }
  }
};
</script>

<style scoped>
.btn {
  margin-right: 0.25rem;
  padding: 0.15rem 0;
  width: 1.75rem;
}
.active {
  background-color: #fcc600;
}
.default {
  border: 0.01rem solid #e1e1e1;
}
</style>


