<template>
  <div class="home">
    <h2>Bienvenido a TeamTrack</h2>
    <p>Organiza tus tareas y mantén tu progreso al día 🚀</p>

    <button @click="goToLogin">Iniciar Sesión</button>

        <!-- Botón directo a proyectos -->
    <router-link to="/projects" class="btn-projects">
      proyectos
    </router-link>
  
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;      /* Centra horizontalmente */
  justify-content: flex-start; /* Mantiene arriba */
  padding-top: 4rem;        /* Espacio desde el top */
  min-height: 100vh;        /* Ocupa toda la pantalla */
  text-align: center;
}

button {
  margin-top: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
}
</style>
