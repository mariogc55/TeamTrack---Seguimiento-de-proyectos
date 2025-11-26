<template>
  <div class="layout">

    <Navbar v-if="isLoggedIn" />

    <div class="content-area">

      <Sidebar v-if="isLoggedIn" />

      <main :class="isLoggedIn ? 'with-layout' : 'no-layout'">
        <router-view />
      </main>

    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/layout/Navbar.vue";
import Sidebar from "@/layout/Sidebar.vue";
import Footer from "@/layout/Footer.vue";

import { isLoggedIn } from "@/stores/authState.js";
</script>

<style scoped>

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area {
  display: flex;
  flex: 1;
}


main.with-layout {
  margin-left: 260px;
  margin-top: 60px;
  padding: 20px;
  width: calc(100% - 260px);
}

main.no-layout {
  margin: 0;
  padding: 20px;
  width: 100%;
}

</style>
