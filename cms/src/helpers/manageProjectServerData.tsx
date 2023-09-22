import { ProjectTeamState } from '../redux/projects/projects.slice';

export const manageProjectSererData = (data: ProjectServerData) => {
  const currentTeam: ProjectTeamState = {
    title: data.title,
    comment: data.comment,
    complexity: data.complexity,
    project_status: data.status || '',
    type_project: data.type || '',
    address_site: data.address_site || '',
    start_date_project: data.start_date_project || '2024-12-31',
    end_date_project: data.end_date_project || '2024-12-31',
    team_leads: data.participants.team_leads,
    users: data.participants.users,
  };

  console.log(currentTeam);
  return currentTeam;
};

export interface ProjectServerData {
  id?: string;
  title: string;
  comment: string;
  type: string;
  complexity: number;
  status: string;
  start_date_project: string | null;
  end_date_project: string | null;
  slug: string;
  participants: ParticipantsServerData;
  address_site: string | null;
}

export interface ParticipantsServerData {
  team_leads: userServerData[];
  users: userServerData[];
}

export interface userServerData {
  first_name: string;
  last_name: string;
  comment: string | null;
}
