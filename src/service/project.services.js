const Project = require('../models/project.model');

async function listPorjects() {
    const projects = await Project.find().populate(['organizer', 'members', 'tasks', 'solutions']);
    return projects;
}

async function findByProjectId(id) {
    return Project.findById(id).populate(['organizer', 'members', 'tasks', 'solutions']);
}

async function saveProject(project) { 
    const { organizer, members, title, short_title, description, project_completion, icon, status } = project;
    const newProject = new Project({ organizer, members, title, short_title, description, project_completion, icon, status });

    const nowDate = new Date();
    newProject.created = nowDate.toISOString().slice(0, 10);
    newProject.modified = nowDate.toISOString().slice(0, 10);

    await newProject.save().then(t => t.populate(['organizer', 'members', 'tasks', 'solutions'])).then(t => t);

    return newProject;
}

async function updateProject(id, project) {
    project.modified = new Date().toISOString().slice(0, 10);
    
    const projectUpdated = await Project.findByIdAndUpdate(id, {
        $set: project
    }, { new : true }).then(t => t.populate(['organizer', 'members', 'tasks', 'solutions'])).then(t => t);

    return projectUpdated;
}

async function deleteProject(id) {
    return await Project.findByIdAndDelete(id)
}

async function assignTask(projectId, task) {
    const projectUpdated = await Project.findByIdAndUpdate(projectId, {
        $push : { tasks : task }
    }, { new : true }).then(t => t.populate(['organizer', 'members', 'tasks'])).then(t => t);

    return projectUpdated;
}

async function assignSolution(projectId, solution) {
    const projectUpdated = await Project.findByIdAndUpdate(projectId, {
        $push : { solutions : solution }
    }, { new : true }).then(t => t.populate(['organizer', 'members', 'solutions'])).then(t => t);

    return projectUpdated;
}

module.exports = { listPorjects, findByProjectId, saveProject, updateProject, deleteProject, assignTask, assignSolution };
