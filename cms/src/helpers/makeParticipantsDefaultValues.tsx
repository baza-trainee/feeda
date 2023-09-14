import { experienceVariants, ListProps, membersRole, projectType } from '../components/SelectField/lists';
import { OptionType } from '../components/SelectField/SelectField';
import { ParticipantData } from '../redux/participants/operations';

export const participantsDefaultValues = (
  formData: ParticipantData | undefined
): ParticipantsDefaultValuesTypes | { speciality: OptionType } => {
  if (!formData)
    return {
      speciality: membersRole[6],
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
    } = formData;
    console.log(projects);
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
      projects: projects.map(({ project }) => {
        return { label: project };
      }),
      experience: experienceVariants.find((item) => item.value === (formData.experience ? 'Так' : 'Ні')),
      role: {
        value: formData.speciality?.title,
        label: membersRole.find((item) => item.value === formData.role)?.label,
      },
      type: {
        value: formData.type,
        label: projectType.find((item) => item.value === formData.type)?.label,
      },
    };
    console.log(defaultValues);
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
  speciality: DropDownTypes;
  type_participant: DropDownTypes;
  experience: ListProps | undefined;
  project: {
    id?: number;
    label: string;
    title?: string;
  }[];
};
