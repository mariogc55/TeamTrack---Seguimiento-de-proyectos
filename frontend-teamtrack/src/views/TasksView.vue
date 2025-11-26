<template>
  <div class="tasks-container">
    <h1>
      Gestión de Tareas 
      <span v-if="userRole === 'admin' && projectId">
        (Proyecto #{{ projectId }})
      </span>
      <span v-else-if="userRole === 'member'">
        Asignadas a Mí
      </span>
    </h1>

    <button 
      v-if="userRole === 'admin' && projectId" 
      class="add-btn" 
      @click="createTaskPrompt">
      ➕ Crear Tarea
    </button>

    <div v-if="loading" class="loading-msg">Cargando tareas...</div>
    <div v-if="error" class="error-msg">⚠️ {{ error }}</div>
    <div v-if="!loading && !error && tasks.length === 0" class="no-tasks">
      No hay tareas {{ userRole === 'admin' ? 'en este proyecto.' : 'asignadas a ti.' }}
    </div>

    <div v-if="tasks.length > 0" class="tasks-grid">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :titulo="task.titulo"
        :descripcion="task.descripcion"
        :fecha_limite="task.fecha_limite"
        :porcentaje_progreso="task.porcentaje_progreso"
        :estado="task.estado"
        :id_asignado_a="task.nombre_asignado_a || 'N/A'"
        @next-status="nextStatus(task)"
        @click="goToTask(task.id)"
  >
    <!-- ACCIÓN: Cambiar estado -->
    <Button
      v-if="userRole === 'admin'"
      @click.stop="nextStatus(task)"
    >
      {{ nextLabel(task) }}
    </Button>
  </TaskCard>
    </div>
    <!-- =============================== -->
    <!--          MODAL CREAR            -->
    <!-- =============================== -->

    <Modal v-if="showCreateModal" @close="closeModal">
  <h2 class="modal-title">Crear Tarea</h2>

  <div class="modal-body">
    <Input placeholder="Nombre de la tarea" v-model="form.titulo" />
    <Input placeholder="Descripción" v-model="form.descripcion" />
  </div>

  <div class="modal-actions">
    <Button variant="primary" @click="submitTask">Crear</Button>
    <Button variant="secondary" @click="closeModal">Cancelar</Button>
  </div>
</Modal>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import {  
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
  createTask 
} from "@/services/taskService";

import Button from "@/components/ui/Button.vue";
import TaskCard from "@/components/TaskCard.vue";
import Input from "@/components/ui/Input.vue";
import Modal from "@/components/ui/Modal.vue";

import { userRole } from "@/stores/authState.js";

const route = useRoute();
const router = useRouter();

const tasks = ref([]);
const loading = ref(true);
const error = ref(null);

const statusFlow = ["Pendiente", "En desarrollo", "Finalizada"];

// ========= MODAL ========= //
const showCreateModal = ref(false);

const form = ref({
  titulo: "",
  descripcion: "",
  fecha_limite: "",
  porcentaje_progreso: 0,
  id_asignado_a: null,
});

function closeModal() {
  showCreateModal.value = false;
  form.value = {
    titulo: "",
    descripcion: "",
    fecha_limite: "",
    porcentaje_progreso: 0,
    id_asignado_a: null,
  };
}

async function createTaskPrompt() {
  if (userRole.value !== 'admin') return;

  const title = prompt("Introduce el título de la nueva tarea:");
  if (!title || title.trim() === "") {
    alert("El título es obligatorio.");
    return;
  }

  const descripcion = prompt("Descripción de la tarea:") || "";
  const fechaHoy = new Date().toISOString().split("T")[0];

  const idAsignado = 1;

  const taskData = {
    titulo: title,
    descripcion,
    fecha_limite: fechaHoy,
    id_proyecto: projectId.value,
    id_asignado_a: idAsignado
  };

  try {
    await createTask(taskData);
    alert(`Tarea "${title}" creada con éxito.`);
    fetchTasks();
  } catch (err) {
    console.error("Error al crear tarea:", err);
    alert(`Error al crear la tarea: ${err.response?.data?.error || "Error interno"}`);
  }
}

const projectId = ref(route.query.projectId);

function nextLabel(task) {
  const currentIdx = statusFlow.indexOf(task.estado);
  const nextIdx = (currentIdx + 1) % statusFlow.length;
  return statusFlow[nextIdx];
}

watch(
  () => route.query.projectId,
  (newId) => {
    projectId.value = newId;
    fetchTasks();
  }
);

async function fetchTasks() {
  loading.value = true;
  error.value = null;

  try {
    let response;

    if (userRole.value === "admin" && projectId.value) {
      response = await getTasksByProject(projectId.value);
    }

    else if (userRole.value === "member") {

      response = await getTaskById(1); 
    }

    const raw = response?.data || [];

    tasks.value = raw
      .map(t => ({
        ...t,
        id: Number(t.id) || Number(t.tarea_id) || null
      }))
      .filter(t => t.id !== null);

  } catch (err) {
    error.value = "No se pudieron cargar las tareas.";
    console.error(err);
  } finally {
    loading.value = false;
  }
}

function goToTask(id) {
  if (!id || isNaN(Number(id))) {
    console.warn("ID inválido, no se navega:", id);
    return;
  }
  router.push(`/task/${id}`);
}

async function nextStatus(task) {
  if (userRole.value !== "admin") return;

  const currentIdx = statusFlow.indexOf(task.estado);
  const nextIdx = (currentIdx + 1) % statusFlow.length;
  const next = statusFlow[nextIdx];

  try {
    await updateTask(task.id, {
      titulo: task.titulo,
      descripcion: task.descripcion,
      fecha_limite: task.fecha_limite,
      porcentaje_progreso: task.porcentaje_progreso,
      id_asignado_a: task.id_asignado_a,
      estado: next
    });

    task.estado = next;
  } catch (err) {
    console.error(err);
  }
}

onMounted(fetchTasks);
</script>

<style scoped>

.tasks-container {
  padding: 2rem;
  color: #fff;
  max-width: 1100px;
  margin: 0 auto;
}


h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #ffffff;
  text-align: left;
}

.add-btn {
  background: #800020;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-weight: 600;
}
.add-btn:hover {
  opacity: 0.85;
}

.loading-msg,
.no-tasks {
  color: #ccc;
  margin: 1rem 0;
  text-align: center;
}

.error-msg {
  background: #702222;
  padding: 0.8rem;
  border-radius: 8px;
  color: #ffd5d5;
  margin-bottom: 1rem;
  text-align: center;
}

.tasks-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  max-width: 1100px;
  margin: 0 auto;
}

.task-card {
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.2rem;
  transition: 0.25s;
  cursor: pointer;
}
.task-card:hover {
  border-color: #800020;
  transform: translateY(-3px);
}

.task-assigned {
  font-size: 0.9rem;
  color: #aaa;
  margin-top: 5px;
}

.status {
  margin-top: 1rem;
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
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
