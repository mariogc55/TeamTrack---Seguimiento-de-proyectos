<template>
  <div class="project-card" @click="$emit('click')">
    <h2>{{ nombre }}</h2>
    <p>{{ descripcion }}</p>

    <div class="leader">
      <strong>Líder:</strong> {{ id_lider }}

      <slot name="actions"></slot>
      
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: String,
  descripcion: String,
  id_lider: Number
});
</script>

<style scoped>
.project-card {
  background: #1f1f1f;
  border: 1px solid #333;
  padding: 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  color: #fff;
}

.project-card:hover {
  border-color: #800020;
  transform: scale(1.02);
}
.leader {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ddd;
}
</style>
