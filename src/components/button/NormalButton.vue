<template>
  <button :disabled="disabled">
    <slot></slot>
  </button>
</template>


<script>
export default {
  props: ["disabled"]
};
</script>


<style scoped>
button {
  background-color: var(--color-yellow);
  border-radius: 0.1rem;
  display: block;
  font-size: 0.3rem;
  height: 0.82rem;
  width: 6.6rem;
  margin: 0 auto;
}
button:disabled {
  background-color: var(--color-gray);
  color: var(--font-color-gray);
}
</style>
