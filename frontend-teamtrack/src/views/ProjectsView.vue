<template>
  <div class="projects-container">

    <h1 class="title">
      {{ userRole === "admin" ? "Todos los Proyectos" : "Mis Proyectos Liderados" }}
    </h1>

    <div class="actions-top">
      <Button
        v-if="userRole === 'admin'"
      class="add-btn"
        @click="showCreateModal = true">
        ➕ Nuevo Proyecto
      </Button>
    </div>

    <Loader v-if="loading" text="Cargando proyectos..." />

    <div v-if="error" class="error-msg">
      ⚠️ {{ error }}
    </div>

    <div v-if="!loading && projects.length === 0" class="no-projects">
      No se encontraron proyectos.
    </div>

    <div v-if="projects.length > 0" class="projects-grid">
      <ProjectCard
        v-for="p in projects"
        :key="p.id"
        :nombre="p.nombre"
        :descripcion="p.descripcion"
        :id_lider="p.id_lider"
        :nombre_lider="p.nombre_lider"
        clickable
        @click="goToProject(p.id)"
      >

        <template #actions v-if="userRole === 'admin'">
          <span 
          class="bx bxs-download download-icon"
          @click.stop="downloadProject(p.id)"
          ></span>
        </template>

      </ProjectCard>
    </div>

    <!--  MODAL -->
 
    <Modal v-if="showCreateModal" @close="closeModal">
      <h2 class="modal-title">Crear Proyecto</h2>

      <div class="modal-body">
        <Input placeholder="Nombre del proyecto" v-model="form.nombre" />
        <Input placeholder="Descripción" v-model="form.descripcion" />
      </div>

      <div class="modal-actions">
        <Button variant="primary" @click="submitProject">Crear</Button>
        <Button variant="secondary" @click="closeModal">Cancelar</Button>
      </div>
    </Modal>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { downloadProjectReport } from "@/services/projectService";

import ProjectCard from "@/components/ProjectCard.vue";
import Loader from "@/components/ui/Loader.vue";
import Button from "@/components/ui/Button.vue";
import Input from "@/components/ui/Input.vue";
import Modal from "@/components/ui/Modal.vue";
import { userRole } from "@/stores/authState.js";


import * as projectService from "@/services/projectService";

const projects = ref([]);
const loading = ref(true);
const error = ref(null);

const router = useRouter();

const showCreateModal = ref(false);
const form = ref({
  nombre: "",
  descripcion: "",
});

function closeModal() {
  showCreateModal.value = false;
  form.value.nombre = "";
  form.value.descripcion = "";
}

async function fetchProjects() {
  loading.value = true;
  error.value = null;

  try {
    const res = await projectService.getProjects();
    projects.value = res.data;
  } catch (err) {
    console.error(err);
    error.value = "No se pudieron cargar los proyectos.";
  } finally {
    loading.value = false;
  }
}

function goToProject(id) {
  router.push({ path: "/tasks", query: { projectId: id } });
}

const downloadProject = async (id) => {
  try {
    const response = await downloadProjectReport(id);

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `reporte_proyecto_${id}.pdf`;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};

async function submitProject() {
  if (!form.value.nombre.trim()) {
    return alert("El nombre es obligatorio.");
  }

  try {
    await projectService.createProject({
      nombre: form.value.nombre,
      descripcion: form.value.descripcion || "Sin descripción",
      id_lider: 1,
    });

    closeModal();
    fetchProjects();
  } catch (err) {
    console.error(err);
    alert("Error al crear proyecto.");
  }
}

onMounted(fetchProjects);
</script>

<style scoped>

.projects-container {
  padding: 2rem;
  color: #fff;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
}

.actions-top {
  margin-bottom: 1.5rem;
}

.projects-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
}

.no-projects {
  margin-top: 2rem;
  color: #ccc;
  text-align: center;
}

.error-msg {
  background: #702222;
  padding: 0.8rem;
  border-radius: 8px;
  color: #ffd5d5;
  margin-bottom: 1rem;
}

.download-icon {
  font-size: 1.4rem;
  cursor: pointer;
  color: #b14a4a;
  transition: 0.2s;
}
.download-icon:hover {
  color: #d66565;
}

.modal-title {
  margin-bottom: 1rem;
  font-size: 1.4rem;
  color: #fff;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
