const { listSolutions, findBySolutionId, saveSolution, updateSolution, deleteSolution, addCorrectiveAction, removeCorrectiveAction, updateMemberValidation, updateActionValidation } = require('../../service/solution.services');

const solutionResolver = {
    Query: {
        async getAllSolutions() {
            return listSolutions();
        },
        async getSolution(_, {id}) {
            return findBySolutionId(id);
        }
    },
    Mutation: {
        async createSolution(_, arg) {
            const newSolution = saveSolution(arg.solution);
            return newSolution;
        },

        async updateSolution(_, arg) {
            const solutionUpdated = updateSolution(arg.id, arg.solution);
            return solutionUpdated;
        },

        async deleteSolution(_, {id}) {
            deleteSolution(id)
            return 'Solution deleted';
        },

        async addCorrectiveAction(_, arg) {
            const updated = addCorrectiveAction(arg.solutionId, arg.action);
            return updated;
        },

        async removeCorrectiveAction(_, arg) {
            const updated = removeCorrectiveAction(arg.solutionId, arg.actionId);
            return updated; 
        },

        async updateMemberValidation(_, arg) {
            const updated = updateMemberValidation(arg.solutionId, arg.memberId, arg.updateValidation);
            return updated;
        },

        async updateActionValidation(_, arg) {
            const updated = updateActionValidation(arg.solutionId, arg.correctiveActionId, arg.memberId, arg.updateValidation);
            return updated;
        }
    }
};

module.exports = { solutionResolver };