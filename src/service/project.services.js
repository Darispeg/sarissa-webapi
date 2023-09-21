const Project = require('../models/project.model');

async function listPorjects() {
    const projects = await Project.find().populate(['organizer', 'members']);
    return projects;
}

async function findByProjectId(id) {
    return Project.findById(id).populate(['organizer', 'members']);
}

async function saveProject(project) {
    const { organizer, members, title, short_title, description, project_completion, icon, status } = project;
    const newProject = new Project({ organizer, members, title, short_title, description, project_completion, icon, status });

    const nowDate = new Date();
    newProject.created = nowDate.toISOString().slice(0, 10);
    newProject.modified = nowDate.toISOString().slice(0, 10);

    await newProject.save().then(t => t.populate(['organizer', 'members'])).then(t => t);

    return newProject;
}

async function updateProject(id, project) {
    project.modified = new Date().toISOString().slice(0, 10);
    
    const projectUpdated = await Project.findByIdAndUpdate(id, {
        $set: project
    }, { new : true }).then(t => t.populate(['organizer', 'members'])).then(t => t);

    return projectUpdated;
}

async function deleteProject(id) {
    return await Project.findByIdAndDelete(id)
}

module.exports = { listPorjects, findByProjectId, saveProject, updateProject, deleteProject };
