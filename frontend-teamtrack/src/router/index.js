import { createRouter, createWebHistory } from "vue-router";
import { isLoggedIn } from "@/stores/authState";

import MainLayout from "@/layout/MainLayout.vue";

import HomeView from "@/views/Home.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ProjectsView from "@/views/ProjectsView.vue";
import TasksView from "@/views/TasksView.vue";
import TaskDetailView from "@/views/TaskDetailView.vue";

const routes = [
{
path: "/",
component: MainLayout,
children: [
{ path: "", name: "home", component: HomeView },
{ path: "projects", name: "projects", component: ProjectsView },
{ path: "tasks", name: "tasks", component: TasksView },
{ path: "task/:id", name: "task-detail", component: TaskDetailView, props: true },
],
},


{ path: "/login", name: "login", component: LoginView, meta: { guestOnly: true } },
{ path: "/register", name: "register", component: RegisterView, meta: { guestOnly: true } },


{ path: '/:pathMatch(.*)*', redirect: '/' }
];



const router = createRouter({
history: createWebHistory(),
routes,
});


export default router;

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return next("/login");
  }

  if (to.meta.guestOnly && isLoggedIn.value) {
    return next("/projects");
  }

  next();
});