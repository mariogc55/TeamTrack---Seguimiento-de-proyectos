import apiClient from './api';

const taskService = {
    async getTasks(role, projectId) {
        if (role === 'admin') {
            const response = await apiClient.get(`/tasks/project/${projectId}`);
            return response.data;
        } else if (role === 'miembro') {
            const response = await apiClient.get('/member/tasks');
            return response.data;
        }
        return [];
    },

    async createTask(taskData) {
        const response = await apiClient.post('/tasks', taskData);
        return response.data;
    },

    async updateTaskStatus(taskId, nuevoEstado, progresoActual = 0) {
        const response = await apiClient.patch(`/tasks/${taskId}/progreso`, {
            estado: nuevoEstado,
            porcentaje_progreso: progresoActual
        });
        return response.data;
    },

    async updateTaskProgress(taskId, data) {
        const response = await apiClient.patch(`/tasks/${taskId}/progreso`, data);
        return response.data;
    },
    
    async getTaskById(taskId) {
        const response = await apiClient.get(`/tasks/${taskId}`);
        return response.data;
    },
};

export default taskService;
