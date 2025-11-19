import apiClient from './api';

const projectService = {
    async getProjects(role) {
        const url = role === 'admin' ? '/projects' : '/member/projects';
        const response = await apiClient.get(url);
        return response.data;
    },

    async createProject(projectData) {
        const response = await apiClient.post('/projects', projectData);
        return response.data;
    },

    async downloadProjectReport(projectId) {
        const url = `/reports/project/${projectId}`;
        const response = await apiClient.get(url, {
            responseType: 'blob'
        });
        
        const blob = response.data;
        const contentDisposition = response.headers['content-disposition'];
        
        let filename = 'reporte.pdf';
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?(.+)"?$/);
            if (match) {
                filename = match[1];
            }
        }

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
        
        return { success: true };
    },
};

export default projectService;