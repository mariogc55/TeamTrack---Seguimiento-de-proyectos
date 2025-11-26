<template>
  <div class="home">
    <h2>Bienvenido a TeamTrack</h2>
    <p>Organiza tus tareas y mantén tu progreso al día 🚀</p>

    <Button @click="goToLogin">
      Iniciar Sesión
    </Button>

    <Button @click="goToProjects" variant="secondary">
      Proyectos
    </Button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Button from "@/components/ui/Button.vue";

const router = useRouter();

function goToLogin() {
  router.push("/login");
}

function goToProjects() {
  router.push("/projects");
}
</script>


<style scoped>
.home {
  text-align: center;
  margin-top: 100px;
  padding: 20px;
}

h2 {
  font-size: 2.4rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  color: var(--color-gray);
  margin-bottom: 40px;
}

.home button {
  margin: 10px 0;
}
</style>
