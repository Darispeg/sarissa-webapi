const { listPorjects, findByProjectId, saveProject, updateProject, deleteProject } = require('../../service/project.services');

const projectResolver = {
    Query: {
        async getAllProject() {
            return listPorjects();
        },
        async getProject(_, {id}) {
            return findByProjectId(id);
        }
    },
    Mutation: {
        async createProject(_, arg) {
            const newProject = saveProject(arg.project);
            return newProject;
        },

        async updateProject(_, arg) {
            const projectUpdated = updateProject(arg.id, arg.project);
            return projectUpdated;
        },

        async deleteProject(_, {id}) {
            deleteProject(id)
            return 'Project deleted';
        }
    }
};

module.exports = { projectResolver };