<template>
  <nav class="navbar-container" v-if="isLoggedIn">
    <button class="back-btn" @click="goBack">⬅ Volver</button>

    <span class="navbar-title">TeamTrack</span>

    <button class="logout-btn" @click="logout">Cerrar sesión</button>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user-token");
    }
  },
  methods: {
  goBack() {
    const previous = this.$route.redirectedFrom;

    if (previous) {
      this.$router.back();
    } else {
      this.$router.push("/projects");
    }
  },



    logout() {
      localStorage.removeItem("user-token");
      localStorage.removeItem("user-role");

      this.$router.push("/login");
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.navbar-container {
  display: flex;
  justify-content: space-between;
  background: #24292e;
  padding: 12px 20px;
  align-items: center;
  color: white;
}

.back-btn,
.logout-btn {
  border: none;
  background: #444;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}

.logout-btn {
  background: #d9534f;
}

.navbar-title {
  font-size: 18px;
  font-weight: bold;
}
</style>
