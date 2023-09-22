import { FieldValues } from 'react-hook-form';
import { InstructionsStateType } from '../redux/instructions';
import { format } from 'date-fns';
import { ProjectServerData } from './manageProjectServerData';

export const manageProjectFormData = (instructions: InstructionsStateType, data: FieldValues) => {
  let currentStatus: { id: number; status: string } | undefined;
  let currentType: { id: number; project_type: string } | undefined;
  let start_date_project: string = '2023-01-01';
  let end_date_project: string = '2023-12-31';

  if (instructions.project_status) {
    currentStatus = instructions.project_status.find((item) => item.status === data.project_status);
  }

  if (instructions.project_types) {
    currentType = instructions.project_types.find((item) => item.project_type === data.type_project);
  }

  if (data.start_date_project instanceof Date) {
    start_date_project = format(data.start_date_project, 'yyyy-MM-dd');
  } else if (typeof data.start_date_project === 'string') {
    start_date_project = data.start_date_project;
  }

  if (data.end_date_project instanceof Date) {
    end_date_project = format(data.end_date_project, 'yyyy-MM-dd');
  } else if (typeof data.end_date_project === 'string') {
    end_date_project = data.end_date_project;
  }

  console.log(currentType);

  const projectData: ProjectServerData = {
    title: data.title,
    comment: data.comment,
    type_project: currentType?.id || 1,
    complexity: data.complexity,
    project_status: currentStatus?.id || 1,
    start_date_project: start_date_project,
    end_date_project: end_date_project,
    address_site: data.address_site,
  };

  return projectData;
};
