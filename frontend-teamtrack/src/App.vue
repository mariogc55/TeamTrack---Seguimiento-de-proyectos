<template>
  <div id="app">

    <!-- NAVBAR GLOBAL -->
    <Navbar v-if="isLoggedIn" />

    <header>
      <router-link to="/" class="logo">TeamTrack 🚀</router-link>

      <div class="role-switch" v-if="isLoggedIn">
        <span>Rol actual: <strong>{{ userRoleLabel }}</strong></span>
        <button @click="toggleRole" class="switch-btn">
          Cambiar a {{ userRole === 'admin' ? 'Miembro' : 'Admin' }}
        </button>
      </div>
    </header>

    <main>
      <router-view />
    </main>

  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { Navbar },
  data() {
    return {
      userRole: localStorage.getItem("user-role") || "member",
    };
  },
  
  provide() {
  return {
    userRole: this.userRole
  };
},

  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user-token");
    },
    userRoleLabel() {
      return this.userRole === "admin" ? "Administrador" : "Miembro";
    }
  },
  methods: {
    toggleRole() {
      this.userRole = this.userRole === "admin" ? "member" : "admin";
      localStorage.setItem("user-role", this.userRole);
      window.location.reload();
    }
  }
};
</script>
