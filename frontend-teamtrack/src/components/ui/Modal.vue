<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: #1f1f1f;
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid #333;
  color: #fff;
  min-width: 300px;
}
</style>
