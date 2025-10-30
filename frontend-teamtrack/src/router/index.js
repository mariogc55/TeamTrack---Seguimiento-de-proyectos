import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import ProjectsView from "../views/ProjectsView.vue";
import TasksView from "../views/TasksView.vue";
import TaskDetailView from "../views/TaskDetailView.vue";

const isAuthenticated = () => {
    return !!localStorage.getItem('user-token');
};

const routes = [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login, meta: { requiresAuth: false } },
    { path: "/register", name: "Register", component: Register, meta: { requiresAuth: false } },

    // rutas protegidas
    { path: '/projects', name: 'projects', component: ProjectsView, meta: { requiresAuth: true } },
    { path: "/tasks/:id", name: "Tasks", component: TasksView, props: true, meta: { requiresAuth: true } },
    { path: '/task/:id', name: 'taskDetail', component: TaskDetailView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/login');
    } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated()) {
        next('/projects');
    } else {
        next();
    }
});

export default router;
