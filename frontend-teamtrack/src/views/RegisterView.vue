
<template>
    <div class="register-container">
        <h2>Crear Cuenta</h2>
        <form @submit.prevent="handleRegister">
            <input type="text" placeholder="Nombre completo" v-model="name" required />
            <input type="email" placeholder="Correo electrónico" v-model="email" required />
            <input 
                type="password" 
                placeholder="Contraseña" 
                v-model="password" 
                @input="checkPasswordMatch" 
                required 
            />
            <input 
                type="password" 
                placeholder="Confirmar Contraseña" 
                v-model="confirmPassword" 
                @input="checkPasswordMatch" 
                required 
            />
            <button type="submit" :disabled="passwordMismatch">Registrarme</button>
        </form>
        
        <p v-if="passwordMismatch" class="error-msg">⚠️ Las contraseñas no coinciden</p>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success-msg">{{ successMessage }}</p>
        
        <p class="switch-link">
          ¿Ya tienes cuenta? <router-link to="/login">Iniciar Sesión</router-link>
        </p>
    </div>
</template>

<script>
import apiClient from '@/services/api';

export default {
    name: "RegisterView",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordMismatch: false,
            errorMessage: "",
            successMessage: "",
        };
    },
    methods: {
        checkPasswordMatch() {
            if (this.password && this.confirmPassword) {
                this.passwordMismatch = this.password !== this.confirmPassword;
            } else {
                this.passwordMismatch = false;
            }
        },
        async handleRegister() {
            this.errorMessage = "";
            this.successMessage = "";
            
            if (this.passwordMismatch || !this.password || !this.confirmPassword) {
                this.errorMessage = "⚠️ Por favor, verifica que las contraseñas coincidan y no estén vacías.";
                return;
            }

            try {
                await apiClient.post('/users/register', {
                    nombre: this.name,
                    correo: this.email,
                    password: this.password,
                });
                
                this.successMessage = "¡Registro exitoso! Redirigiendo a Iniciar Sesión...";
                
                this.name = this.email = this.password = this.confirmPassword = "";

                setTimeout(() => {
                    this.$router.push('/login');
                }, 2000);

            } catch (error) {
                this.errorMessage = error.response?.data?.error || 'Error de red o servidor.';
                console.error("Error de Registro:", error);
            }
        },
    },
};
</script>

<style scoped>
.register-container {
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

button[type="submit"]:hover:not(:disabled) {
    background: #a00028;
}

button[type="submit"]:disabled {
    background: #555;
    cursor: not-allowed;
}

.error-msg {
    color: #ff6666;
    margin-top: 15px;
    font-size: 0.95rem;
}

.success-msg {
    color: #4CAF50;
    margin-top: 15px;
    font-size: 0.95rem;
    font-weight: bold;
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