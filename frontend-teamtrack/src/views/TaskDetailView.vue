<template>
  <div class="task-detail">

    <div v-if="loading">Cargando tarea...</div>
    <div v-if="error">⚠️ {{ error }}</div>

    <div v-if="task">
      <h1>{{ task.titulo }}</h1>
      <p>{{ task.descripcion }}</p>

      <p><strong>Estado:</strong> {{ task.estado }}</p>
      <p><strong>Proyecto:</strong> {{ task.nombre_proyecto }}</p>
      <p><strong>Asignado a:</strong> {{ task.nombre_asignado_a }}</p>
      <p><strong>Fecha límite:</strong> {{ task.fecha_limite }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import * as taskService from "@/services/taskService";

const task = ref(null);
const loading = ref(true);
const error = ref(null);

const route = useRoute();

const fetchTaskDetail = async () => {
  loading.value = true;

  try {
    const id = route.params.id;
    const res = await taskService.getTaskById(id);
    task.value = res.data;
  } catch (err) {
    error.value = "Error al cargar la tarea.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTaskDetail();
});
</script>




<style scoped>
.task-detail {
  color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

.back-btn {
  background-color: #800020;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.back-btn:hover {
  background-color: #a00028;
}

h1 {
    margin-bottom: 1rem;
}
.description {
    font-size: 1.1rem;
    color: #ccc;
    margin-bottom: 2rem;
}

.status-info {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.task-metadata {
    margin-top: 2rem;
    text-align: left;
    display: inline-block;
    padding: 20px;
    background: #1f1f1f;
    border-radius: 8px;
}

.task-metadata p {
    margin: 8px 0;
}
.task-metadata strong {
    color: #800020;
}

.status.pendiente {
  background: #a0522d;
}

.status.en-desarrollo {
  background: #3b82f6;
}

.status.finalizada {
  background: #16a34a;
}

.loading-msg, .error-msg, .not-found-msg {
    margin: 50px 0;
    font-size: 1.2rem;
    color: #ff6666;
}
.loading-msg {
    color: #aaa;
}
</style>