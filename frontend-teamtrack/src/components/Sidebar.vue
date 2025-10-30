<template>
  <div class="app">
    <header class="header">
      <h1>TeamTrack</h1>
    </header>

    <main class="main">
      <p></p>
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  background-color: var(--color-surface);
  width: 100%;
  padding: 1rem;
  text-align: center;
}

.header h1 {
  margin: 0;
  color: var(--color-primary);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.btn {
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 6px;
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--color-primary);
}
</style>
