import { experienceVariants, ListProps, membersRole, projectType } from '../components/SelectField/lists';
import { OptionType } from '../components/SelectField/SelectField';
import { ParticipantData } from '../redux/participants/operations';

export const participantsDefaultValues = (
  formData: ParticipantData | undefined
): ParticipantsDefaultValuesTypes | { role: OptionType } => {
  if (!formData)
    return {
      role: membersRole[6],
    };
  else {
    const {
      id,
      first_name,
      last_name,
      comment,
      phone_number,
      email,
      account_discord,
      account_linkedin,
      city,
      stack,
      projects,
      role,
      type,
    } = formData;

    const defaultValues = {
      id,
      first_name,
      last_name,
      comment,
      phone_number,
      email,
      account_discord,
      account_linkedin,
      city,
      stack,
      projects: projects.map(({ project, id }) => {
        return { label: project, id };
      }),
      experience: experienceVariants.find((item) => item.value === (formData.experience ? 'Так' : 'Ні')),
      role: {
        value: role,
        label: membersRole.find((item) => item.value === role)?.label,
      },
      type: {
        value: type,
        label: projectType.find((item) => item.value === type)?.label,
      },
    };

    return defaultValues;
  }
};

type DropDownTypes = {
  value: string;
  label: JSX.Element | undefined;
};

export type ParticipantsDefaultValuesTypes = {
  id: string;
  first_name: string;
  last_name: string;
  comment: string;
  phone_number: string;
  email: string;
  account_discord: string;
  account_linkedin: string;
  city: string;
  stack: string;
  role: DropDownTypes;
  type: DropDownTypes;
  experience: ListProps | undefined;
  projects: {
    id: number;
    label: string;
  }[];
};
