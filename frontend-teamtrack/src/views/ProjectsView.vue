<template>
  <div class="projects-container"> 
    <h1>{{ userRole === 'admin' ? 'Todos los Proyectos' : 'Mis Proyectos Liderados' }}</h1>

     <button v-if="userRole === 'admin'" class="add-btn" @click="createProject">
     ➕ Nuevo Proyecto
     </button>

    <div v-if="loading" class="loading-msg">Cargando proyectos...</div>
    <div v-if="error" class="error-msg">⚠️ Error al cargar los proyectos: {{ error }}</div>
    
    <div v-if="!loading && !error && projects.length === 0" class="no-projects">
        No se encontraron proyectos {{ userRole === 'admin' ? 'en el sistema.' : 'a tu cargo.' }}
    </div>

    <div v-if="projects.length > 0" class="projects-grid">
      <div
        v-for="project in projects"
        :key="project.id"
        class="project-card"
      >
        <div class="project-header">
          <h3 class="project-name" @click="goToProject(project.id)">
            {{ project.nombre }}
          </h3>
          <span
            v-if="userRole === 'admin'"
            class='bx bxs-download icon'
            @click.stop="downloadProject(project.id)">
          </span>
        </div>
        <p class="project-leader">Líder: {{ project.nombre_lider || 'N/A' }}</p>
        <p>{{ project.descripcion || 'Sin descripción.' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import projectService from '@/services/projectService';

export default {
    name: "ProjectsView",
    inject: ["userRole"],
    data() {
        return {
            projects: [],
            loading: true,
            error: null,
        };
    },
    created() {
        this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            this.loading = true;
            this.error = null;
            try {
                const data = await projectService.getProjects(this.userRole);
                this.projects = data;
            } catch (err) {
                this.error = 'No se pudieron cargar los proyectos. Revisa que el backend esté corriendo y que tu token sea válido.';
                console.error("Error al obtener proyectos:", err);
            } finally {
                this.loading = false;
            }
        },

        goToProject(projectId) {
            this.$router.push(`/tasks/${projectId}`); 
        },

        async downloadProject(projectId) {
            if (this.userRole !== 'admin') return;

            try {
                await projectService.downloadProjectReport(projectId);
                alert(`Descarga del reporte del proyecto ${projectId} iniciada.`);
            } catch (err) {
                alert('Error al descargar el reporte. Revisa el ID y la consola.');
                console.error("Error de descarga:", err);
            }
        },

        async createProject() {
            if (this.userRole !== 'admin') return;
            
            const newName = prompt("Introduce el nombre del nuevo proyecto:");
            if (!newName) return;

            const idLider = 1;

            try {
                await projectService.createProject({
                    nombre: newName,
                    descripcion: `Proyecto creado por ${this.userRoleLabel} el ${new Date().toLocaleDateString()}.`,
                    id_lider: idLider
                });
                
                alert(`Proyecto "${newName}" creado con éxito.`);
                this.fetchProjects();
            } catch (err) {
                alert(`Error al crear el proyecto: ${err.response?.data?.error || 'Error de servidor'}`);
                console.error("Error al crear proyecto:", err);
            }
        },
    },
};
</script>

<style scoped>
.projects-container {
  color: #f5f5f5;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  color: #e0e0e0;
}

.add-btn {
  background-color: #800020;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease;
}

.add-btn:hover {
  background-color: #a22;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  justify-items: center;
}

.project-card {
  border: 1px solid #333;
  border-radius: 8px;
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  transition: all 0.3s ease;
}

.project-card:hover {
  background: #292929;
  border-color: #800020;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.project-name {
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
}

.project-name:hover {
  color: #800020;
}

.icon {
  background: #800020;
  border-radius: 6px;
  padding: 6px 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon:hover {
  transform: scale(1.1);
  background: #a22;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    width: 90%;
  }
}
</style>
