<template>
  <nav class="navbar-container" v-if="isLoggedIn">
    <Button color="secondary" class="back-btn" @click="goBack">⬅ Volver</Button>

    <Button color="tertiary" class="navbar-title" @click="goHome">TeamTrack</Button>

    <Button color="secondary" class="logout-btn" @click="logout">Cerrar sesión</Button>

  </nav>
</template>

<script setup>
import Button from "@/components/ui/Button.vue";
import { useRouter } from "vue-router";
import { isLoggedIn, userRole } from "@/stores/authState.js";

const router = useRouter();

const goBack = () => {
  if (window.history.length > 2) router.back();
  else router.push("/");
};

const goHome = () => {
  router.push("/");
};

const logout = () => {
  localStorage.removeItem("user-token");
  localStorage.removeItem("user-role");

  isLoggedIn.value = false;
  userRole.value = "member";

  router.push("/");
};
</script>


<style scoped>
.navbar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;

  background: #111;
  color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
  z-index: 1100;
}
</style>
