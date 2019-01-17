<template>
  <div>
    <button class="btn" @click="btnClick">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    btnClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.btn {
  background-color: var(--btn-bg-color);
}
</style>

