<template>
    <div class="login-container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="login">
            <input type="email" placeholder="Correo electrónico" v-model="email" required />
            <input type="password" placeholder="Contraseña" v-model="password" required />
            <button type="submit">Entrar</button>
        </form>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        <p class="switch-link">
          ¿No tienes cuenta? <router-link to="/register">Regístrate</router-link>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/services/api'
import { isLoggedIn, userRole, setUserName } from "@/stores/authState.js";

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  errorMessage.value = ''

  try {
    const response = await apiClient.post('/users/login', {
      correo: email.value,
      password: password.value,
    })

    const token = response.data.token
    const rol = response.data.usuario?.rol
    const nombre = response.data.usuario?.nombre

    setUserName(nombre)
    
    localStorage.setItem('user-token', token)
    localStorage.setItem('user-role', rol)

    isLoggedIn.value = true
    userRole.value = rol

    router.push('/projects');

  } catch (error) {
    errorMessage.value =
      error.response?.data?.error || 'Error de red o servidor.'
    console.error('Error de Login:', error)
  }
}
</script>


<style scoped>

.login-container {
    padding: 2.5rem;
    max-width: 450px;
    margin: 80px auto; 
    background-color: #1a1a1a;
    border-radius: 12px;
    color: #f5f5f5;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

h2 {
    margin-bottom: 2rem;
    color: #800020;
}

form {
    display: flex;
    flex-direction: column;
}

input {
    background-color: #333;
    color: #f5f5f5;
    border: 1px solid #555; 
    padding: 12px;
    margin-bottom: 15px; 
    border-radius: 6px;
    font-size: 1rem;
}

input:focus {
    border-color: #800020;
    outline: none;
    box-shadow: 0 0 0 2px rgba(128, 0, 32, 0.4);
}

button[type="submit"] {
    background: #800020;
    color: #fff;
    border: none;
    padding: 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: 0.3s;
    margin-top: 10px;
}

button[type="submit"]:hover {
    background: #a00028;
}

.error-msg {
    color: #ff6666;
    margin-top: 15px;
    font-size: 0.95rem;
}

.switch-link {
    margin-top: 25px;
}

.switch-link a {
    color: #800020;
    text-decoration: none;
}

.switch-link a:hover {
    text-decoration: underline;
}
</style>