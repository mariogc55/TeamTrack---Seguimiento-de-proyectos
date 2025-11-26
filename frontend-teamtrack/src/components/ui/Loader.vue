<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 28px;
  height: 28px;
  border: 4px solid #333;
  border-top-color: #800020;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: auto;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
