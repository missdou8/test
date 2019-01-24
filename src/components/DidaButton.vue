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
  text-align: center;
  width: 6.25rem;
  height: 0.8rem;
  font-size: var(--font-size-bigger);
  color: #000;
}
</style>

