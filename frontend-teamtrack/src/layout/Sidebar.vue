<template>
  <aside class="sidebar" v-if="isLoggedIn">
    <div class="user-info">
      <p class="user-name">👋 Hola, <strong>{{ userName }}</strong></p>

     <div class="role-switch">
        <span>Rol actual: <strong>{{ userRole }}</strong></span>
       
        <Button 
          color="tertiary"
          class="switch-btn"
          @click="toggleRole"
          >
          Cambiar a {{ userRole === 'admin' ? 'Miembro' : 'Admin' }}
        </Button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import Button from "../components/ui/Button.vue";
import { userRole, isLoggedIn, userName, toggleRole } from "@/stores/authState.js";
import { useRouter } from "vue-router";

const router = useRouter();
</script>



<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;

  background: #1f1f1f;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1000;
}

.role-switch {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 20px;
  text-align: center;

  width: 100%;
}
</style>
