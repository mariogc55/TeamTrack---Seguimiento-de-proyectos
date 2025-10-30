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

    async updateTaskStatus(taskId, nuevoStatus) {
        const updateData = {
            estado: nuevoStatus
        };
        const response = await apiClient.put(`/tasks/${taskId}/status`, updateData);
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