import { addProject,deleteProject, fetchProjects } from './actions';
import { actions } from './projects.slice';

const allActions = {
  ...actions,
  fetchProjects,
  deleteProject,
  addProject,
};

export { allActions as actions };
export { reducer } from './projects.slice';
