<template>
  <Modal @close="$emit('cancel')">
    <h3>¿Seguro?</h3>
    <p>{{ message }}</p>

    <div class="actions">
      <button class="cancel" @click="$emit('cancel')">Cancelar</button>
      <button class="confirm" @click="$emit('confirm')">Confirmar</button>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "./Modal.vue";

defineProps({
  message: String
});
</script>

<style scoped>
.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.cancel {
  background: #333;
  padding: 8px 14px;
  border-radius: 6px;
  color: #fff;
  border: none;
}
.confirm {
  background: #800020;
  padding: 8px 14px;
  border-radius: 6px;
  color: #fff;
  border: none;
}
</style>
