<template>
  <div class="tasks-container">
    <h1>
        Gestión de Tareas 
        <span v-if="userRole === 'admin' && $route.params.id">
            (Proyecto #{{ $route.params.id }})
        </span>
        <span v-else-if="userRole === 'member'">
            Asignadas a Mí
        </span>
    </h1>

        <button 
        v-if="userRole === 'admin' && $route.params.id" 
        class="add-btn" 
        @click="createTask">
          ➕ Crear Tarea
    </button>

    <div v-if="loading" class="loading-msg">Cargando tareas...</div>
    <div v-if="error" class="error-msg">⚠️ {{ error }}</div>
    <div v-if="!loading && !error && tasks.length === 0" class="no-tasks">
        No hay tareas {{ userRole === 'admin' ? 'en este proyecto.' : 'asignadas a ti.' }}
    </div>

    <div v-if="tasks.length > 0" class="tasks-grid">
      <div
        v-for="task in tasks"
        :key="task.id"
        class="task-card"
        @click="goToTask(task.id)"
      >
                <h2>{{ task.titulo }}</h2>
        <p>{{ task.descripcion }}</p>

        <p class="task-assigned">Asignado a: {{ task.nombre_asignado_a || 'N/A' }}</p>


                <button
          :disabled="userRole !== 'admin'"
          @click.stop="nextStatus(task)"
          :class="['status', task.estado.toLowerCase().replace(/\s/g, '-')]"
        >
          {{ task.estado }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import taskService from '@/services/taskService';

export default {
    name: "TasksView",
    inject: ["userRole"],
    props: {
        id: [String, Number] 
    },
    data() {
        return {
            tasks: [],
            loading: true,
            error: null,
            statusFlow: ["Pendiente", "En desarrollo", "Finalizada"], 
        };
    },
    computed: {
        projectId() {
            return this.$route.params.id; 
        }
    },
    watch: {
        projectId: 'fetchTasks' 
    },
    created() {
        this.fetchTasks();
    },
    methods: {
        async fetchTasks() {
            this.loading = true;
            this.error = null;
            try {
                const data = await taskService.getTasks(this.userRole, this.projectId);
                this.tasks = data;
            } catch (err) {
                this.error = 'No se pudieron cargar las tareas. Revisa el ID del proyecto o tu token.';
                console.error("Error al obtener tareas:", err);
            } finally {
                this.loading = false;
            }
        },

        async createTask() {
            if (this.userRole !== 'admin') return;

            const title = prompt("Introduce el título de la nueva tarea:");
            if (!title) return;

            const taskData = {
                titulo: title,
                descripcion: prompt("Descripción:"),
                fecha_limite: new Date().toISOString().split('T')[0],
                id_proyecto: this.projectId,
                id_asignado_a: 7
            };

            try {
                await taskService.createTask(taskData);
                alert(`Tarea "${title}" creada con éxito.`);
                this.fetchTasks();
            } catch (err) {
                alert(`Error al crear la tarea: ${err.response?.data?.error || 'Error de servidor'}`);
                console.error("Error al crear tarea:", err);
            }
        },

        async nextStatus(task) {
            if (this.userRole !== 'admin') return;

            const currentIdx = this.statusFlow.indexOf(task.estado);
            const nextIdx = (currentIdx + 1) % this.statusFlow.length;
            const nextStatus = this.statusFlow[nextIdx];

            try {
                await taskService.updateTaskStatus(task.id, nextStatus);
                task.estado = nextStatus; 
            } catch (err) {
                alert(`Error al actualizar el estado: ${err.response?.data?.error || 'Error de servidor'}`);
                console.error("Error al actualizar estado:", err);
            }
        },

        goToTask(taskId) {
            this.$router.push(`/task/${taskId}`);
        },
    },
};
</script>

<style scoped>
.tasks-container {
  color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
}

.loading-msg, .error-msg, .no-tasks {
    margin: 20px 0;
    font-size: 1.1rem;
}
.error-msg {
    color: #ff6666;
}

/* Boton para crear tarea (solo admin) */
.add-btn {
  background: #800020;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 2rem;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.task-card {
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  transition: 0.3s;
  cursor: pointer;
}

.task-card:hover {
  border-color: #800020;
  transform: scale(1.02);
}

.task-assigned {
    font-size: 0.9rem;
    color: #aaa;
    margin-top: 5px;
    margin-bottom: 5px;
}

/* evita que el boton herede el evento del click */
.status {
  margin-top: 1rem;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
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

.status:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .tasks-grid {
    grid-template-columns: 1fr;
  }
}
</style>