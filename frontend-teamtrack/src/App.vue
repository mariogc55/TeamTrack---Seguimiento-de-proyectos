<template>
  <div id="app">
    <header>
      <!-- titulo clickeable -->
      <router-link to="/" class="logo">TeamTrack  🚀</router-link>

      <div class="role-switch">
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
export default {
  name: "App",
  data() {
    return {
      userRole: localStorage.getItem("userRole") || "member",
    };
  },
  computed: {
    userRoleLabel() {
      return this.userRole === "admin" ? "Administrador" : "Miembro";
    },
  },
  provide() {
    return {
      userRole: this.userRole,
    };
  },
  watch: {
    userRole(newRole) {
      localStorage.setItem("userRole", newRole);
    },
  },
  methods: {
    toggleRole() {
      this.userRole = this.userRole === "admin" ? "member" : "admin";
      localStorage.setItem("user-role", this.userRole);
      window.location.reload();
    },
  },
};
</script>

<style>
#app {
  background-color: #1e1e1e;
  color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  text-align: center;
  padding: 1rem;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #f5f5f5;
  text-decoration: none;
}

.logo:hover {
  color: #800020;
}

.role-switch {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.95rem;
}

.switch-btn {
  background-color: #800020;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.switch-btn:hover {
  background-color: #a22;
}

main {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
