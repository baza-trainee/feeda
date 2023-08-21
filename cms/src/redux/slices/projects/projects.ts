import { fetchProjects, deleteProject } from './actions';
import { actions } from './projects.slice';

const allActions = {
  ...actions,
  fetchProjects,
  deleteProject,
};

export { allActions as actions };
export { reducer } from './projects.slice';
