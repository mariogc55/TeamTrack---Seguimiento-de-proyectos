import { ref } from "vue";

export const userRole = ref(localStorage.getItem("user-role") || "member");
export const isLoggedIn = ref(!!localStorage.getItem("user-token"));
export const userName = ref(localStorage.getItem("user-name") || "Usuario");

export function setUserName(name) {
  userName.value = name;
  localStorage.setItem("user-name", name);
}

export function setRole(role) {
  userRole.value = role;
  localStorage.setItem("user-role", role);
}

export function toggleRole() {
  const newRole = userRole.value === "admin" ? "member" : "admin";
  setRole(newRole);
}
