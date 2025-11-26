<template>
  <button class="ui-btn" :class="color" v-bind="$attrs">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary"
  }
});
</script>

<style scoped>
.ui-btn {
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
.ui-btn.primary { background: #800020; color: #fff; }
.ui-btn.secondary { background: #1f1f1f; color: #fff; }
.ui-btn.tertiary { background: #f5f5f5; color: #000; }
.ui-btn:hover { opacity: 0.85; }
</style>
