const Solution = require('../models/solution.model');
const { assignSolution } = require('../service/project.services');


async function listSolutions() {
    const solutions = await Solution.find().populate(['organizer', 'members.member']);
    return solutions;
}

async function findBySolutionId(id) {
    return Solution.findById(id).populate(['organizer', 'members.member']);
}

async function saveSolution(solution) {
    const { projectId, organizer, members, title, description, trigger, corrective_actions, status } = solution;
    
    if (!Array.isArray(members) || members.length !== 5 ||
        !members.find(i => i.role === 'OPERATOR') ||
        !members.find(i => i.role === 'TECHNICIAN') ||
        !members.find(i => i.role === 'SUPERVISOR') ||
        !members.find(i => i.role === 'SPECIALIST') ||
        !members.find(i => i.role === 'AREA_MANAGER')
    ) {
        throw new Error('Los miembros deben ser ["OPERATOR", "TECHNICIAN", "SUPERVISOR", "SPECIALIST", "AREA_MANAGER"].');
    }

    const newSolution = new Solution({ organizer, members, title, description, trigger, corrective_actions, status });
    
    const nowDate = new Date();
    newSolution.created = nowDate.toISOString().slice(0, 10);
    newSolution.modified = nowDate.toISOString().slice(0, 10);

    try {
        const savedSolution = await newSolution.save();
        await savedSolution.populate(['organizer', 'members.member']).then(t => t);

        assignSolution(projectId, savedSolution.id);

        return savedSolution;
    } catch (error) {
        throw new Error(`Error al guardar la solución: ${error.message}`);
    }
}

async function updateSolution(id, solution) {
    solution.modified = new Date().toISOString().slice(0, 10);
    
    const solutionUpdated = await Solution.findByIdAndUpdate(id, {
        $set: solution
    }, { new : true }).then(t => t.populate(['organizer', 'members.member'])).then(t => t);

    return solutionUpdated;
}

async function deleteSolution(id) {
    return await Solution.findByIdAndDelete(id)
}

async function addCorrectiveAction(solutionId, action) {
    try {
        const solution = await Solution.findById(solutionId);

        if (!solution) {
            throw new Error('Solución no encontrada');
        }
        solution.members.forEach(element => {
            const validation = { member : element.member, validation: false }
            action.user_validation.push(validation);            
        });
        
        const solutionUpdated = await Solution.findByIdAndUpdate(
            solutionId,
            { $push: { corrective_actions: action } },
            { new: true }
        )
        .populate(['organizer', 'members'])
        .then(t => t);

        return solutionUpdated;
    } catch (error) {
        throw new Error(`Error al agregar la acción correctiva: ${error.message}`);
    }
}

async function removeCorrectiveAction(solutionId, actionId) {
    try {
        const solution = await Solution.findById(solutionId);

        if (!solution) {
            throw new Error('Solución no encontrada');
        }

        const actionIndex = solution.corrective_actions.findIndex(action => action.id === actionId);

        if (actionIndex === -1) {
            throw new Error('Acción correctiva no encontrada');
        }

        solution.corrective_actions.splice(actionIndex, 1);
        const solutionUpdated = await solution.save();
        
        return solutionUpdated;
    } catch (error) {
        throw new Error(`Error al eliminar la acción correctiva: ${error.message}`);
    }
}

async function updateMemberValidation(solutionId, memberId, updateValidation) {
    try {
        const solution = await Solution.findById(solutionId);

        if (!solution) {
            throw new Error('Solución no encontrada');
        }

        const memberIndex = solution.members.findIndex(member => member.member.equals(memberId));

        if (memberIndex === -1) {
            throw new Error('Miembro no encontrado');
        }

        solution.members[memberIndex].validation = updateValidation;
        await solution.save();

        return solution;
    } catch (error) {
        throw new Error(`Error al actualizar la validación del miembro: ${error.message}`);
    }
}


async function updateActionValidation(solutionId, correctiveActionId, memberId, updateValidation) {
    try {
        const solution = await Solution.findById(solutionId);

        if (!solution) {
            throw new Error('Solución no encontrada');
        }

        const correctiveActionIndex = solution.corrective_actions.findIndex(action => action.id === correctiveActionId);

        if (correctiveActionIndex === -1) {
            throw new Error('Acción correctiva no encontrada');
        }

        const userValidationIndex = solution.corrective_actions[correctiveActionIndex].user_validation.findIndex(validation => validation.member.toString() === memberId);

        if (userValidationIndex === -1) {
            throw new Error('Usuario no encontrada');
        }

        solution.corrective_actions[correctiveActionIndex].user_validation[userValidationIndex].validation = updateValidation;
        await solution.save();

        return solution;
    } catch (error) {
        throw new Error(`Error al actualizar la validación del usuario: ${error.message}`);
    }
}


module.exports = { listSolutions, findBySolutionId, saveSolution, updateSolution, deleteSolution, addCorrectiveAction, removeCorrectiveAction, updateMemberValidation, updateActionValidation };
