import api from "@/services/api";

export const getTasksByProject = (projectId) =>
  api.get(`/tasks/project/${projectId}`);

export const getTaskById = (taskId) => api.get(`/tasks/${taskId}`);

export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const createTask = (data) => api.post(`/tasks`, data);
