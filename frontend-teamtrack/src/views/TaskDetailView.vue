<template>
  <div class="task-detail">
    <button class="back-btn" @click="$router.back()">← Volver</button>
    
    <div v-if="loading" class="loading-msg">Cargando detalles de la tarea...</div>
    <div v-else-if="error" class="error-msg">⚠️ {{ error }}</div>

    <div v-else-if="task">
        <h1>{{ task.titulo }}</h1>
        <p class="description">{{ task.descripcion }}</p>

      <div class="status-info">
            <label>Estado:</label>
            <span :class="['status', task.estado.toLowerCase().replace(/\s/g, '-')]"
                style="padding: 5px 10px; border-radius: 5px; font-weight: bold;">
                {{ task.estado }}
            </span>
      </div>
        <div class="task-metadata">
            <p><strong>Proyecto:</strong> {{ task.nombre_proyecto || 'N/A' }}</p>
            <p><strong>Asignado a:</strong> {{ task.nombre_asignado_a || 'N/A' }}</p>
            <p><strong>Fecha Límite:</strong> {{ new Date(task.fecha_limite).toLocaleDateString() }}</p>
            <p><strong>Progreso:</strong> {{ task.porcentaje_progreso || 0 }}%</p>
        </div>
    </div>
    <div v-else class="not-found-msg">Tarea no encontrada.</div>
  </div>
</template>

<script>
import taskService from '@/services/taskService.js';

export default {
  name: "TaskDetailView",
  data() {
    return {
      task: null,
      loading: true,
      error: null,
    };
  },
    created() {
        this.fetchTaskDetail();
    },
    methods: {
        async fetchTaskDetail() {
            this.loading = true;
            this.error = null;
            const taskId = this.$route.params.id;

            try {
                const data = await taskService.getTaskById(taskId);
                this.task = data;
            } catch (err) {
                this.error = 'No se pudieron cargar los detalles de la tarea.';
                console.error("Error al obtener detalle de tarea:", err);
            } finally {
                this.loading = false;
            }
        }
    }
};
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