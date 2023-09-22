import { FieldValues } from 'react-hook-form';
import { InstructionsStateType } from '../redux/instructions';

export const manageTeamFromData = (instructions: InstructionsStateType, data: FieldValues, projectId: number) => {
  const transformedUserData: TransformedUserData = {
    user: [],
    team_lead: [],
    comments: {},
    speciality: {},
    project: projectId,
  };

  const processUserData = (userData: UserData[], groupKey: 'user' | 'team_lead') => {
    userData.forEach((user) => {
      const userId = user.full_name.value;
      transformedUserData[groupKey].push(userId);
      transformedUserData.comments[userId] = user.comment;

      if (instructions.specialities !== null) {
        const specialityMatch = instructions.specialities.find((item) => item.title === user.membersRole);
        transformedUserData.speciality[userId] = specialityMatch ? specialityMatch.id : 9;
      } else {
        transformedUserData.speciality[userId] = null;
      }
    });
  };

  processUserData(data.user, 'user');
  processUserData(data.team_lead, 'team_lead');

  console.log(transformedUserData);
  return transformedUserData;
};

interface TransformedUserData {
  user: string[];
  team_lead: string[];
  comments: Record<string, string>;
  speciality: Record<string, number | null>;
  project: number;
}

interface UserData {
  full_name: {
    value: string;
  };
  comment: string;
  membersRole: string;
}
