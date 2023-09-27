import { format } from 'date-fns';
import { ProjectServerData, userServerData } from './manageProjectServerData';

export const manageProjectFormData = (data: ProjectFormData) => {
  let start_date_project: string = '2023-01-01';
  let end_date_project: string = '2023-12-31';

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

  const mapUsersToServerData = (users: (userServerData | UserFormData)[]): userServerData[] => {
    return users.map((user) => {
      console.log('yep');
      const { comment, role, full_name } = user as UserFormData;
      const { first_name, last_name, value } = full_name;
      return {
        first_name,
        last_name,
        comment,
        role,
        id: value,
      };
    });
  };

  const projectData: ProjectServerData = {
    title: data.title,
    comment: data.comment,
    type: data.type,
    complexity: data.complexity,
    status: data.status,
    start_date_project: start_date_project,
    end_date_project: end_date_project,
    address_site: data.address_site,
    participants: {
      users: mapUsersToServerData(data.users),
      team_leads: mapUsersToServerData(data.team_leads),
    },
  };

  return projectData;
};

export interface ProjectFormData {
  title: string;
  address_site: string;
  comment: string;
  complexity: number;
  end_date_project: string | Date;
  start_date_project: string | Date;
  team_leads: userServerData[] | UserFormData[];
  users: userServerData[] | UserFormData[];
  type: string;
  status: string;
}

export interface UserFormData {
  comment: string | null;
  role: string | null;
  full_name: {
    value: string;
    label: string;
    first_name: string;
    last_name: string;
  };
}
