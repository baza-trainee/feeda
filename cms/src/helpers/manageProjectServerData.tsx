import { ProjectTeamState } from '../redux/projects/projects.slice';
import { UserFormData } from './manageProjectFormData';

export const manageProjectSererData = (data: ProjectServerData) => {
  const {
    title,
    comment,
    complexity,
    status,
    type,
    address_site,
    start_date_project,
    end_date_project,
    participants,
    slug,
  } = data;
  const { users, team_leads } = participants;

  let mapedUsers: UserFormData[] | [] = [];
  let mapedTeamLeads: UserFormData[] | [] = [];

  if (users.length > 0) {
    mapedUsers = users.map((user: userServerData) => ({
      full_name: {
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      comment: user.comment,
      role: user.role,
    }));
  }

  if (team_leads.length > 0) {
    mapedTeamLeads = team_leads.map((user: userServerData) => ({
      full_name: {
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      comment: user.comment,
      role: user.role,
    }));
  }

  const currentTeam: ProjectTeamState = {
    title,
    comment,
    complexity,
    status: status || '',
    type: type || '',
    address_site: address_site || '',
    start_date_project: start_date_project || '2024-12-31',
    end_date_project: end_date_project || '2024-12-31',
    team_leads: mapedTeamLeads,
    users: mapedUsers,
    slug: slug || '',
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
  slug?: string;
  participants: ParticipantsServerData;
  address_site: string | null;
}

export interface ParticipantsServerData {
  team_leads: userServerData[];
  users: userServerData[];
}

export interface userServerData {
  id: string;
  first_name: string;
  last_name: string;
  comment: string | null;
  role: string | null;
}
