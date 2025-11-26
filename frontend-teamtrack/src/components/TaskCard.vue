<template>
  <div class="task-card" @click="$emit('click')">
    <h3>{{ titulo }}</h3>
    <p>{{ descripcion }}</p>

    <div class="meta">
      <span> {{ fecha_limite }}</span>
      <span>{{ porcentaje_progreso }}%</span>
    </div>

    <span class="status" :class="estado">{{ estado }}</span>

    <div class="assigned">
      <strong>Asignado a:</strong> {{ id_asignado_a }}
    </div>

    <slot></slot>
  </div>
</template>


<script setup>
defineProps({
  titulo: String,
  descripcion: String,
  fecha_limite: String,
  porcentaje_progreso: Number,
  estado: String,
  id_asignado_a: String
});

</script>

<style scoped>
.task-card {
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.5rem;
  transition: 0.25s ease;
}

.task-card:hover {
  transform: translateY(-3px);
  border-color: #800020;
}


.meta {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #ccc;
}

.status {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
}
.status.pendiente { background: #a0522d; }
.status.en-desarrollo { background: #3b82f6; }
.status.finalizada { background: #16a34a; }

.assigned {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #ddd;
}
</style>
