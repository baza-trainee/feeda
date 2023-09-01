import { experienceVariants, ListProps, membersRole, projectType } from '../components/SelectField/lists';
import { OptionType } from '../components/SelectField/SelectField';
import { ParticipantData } from '../redux/participants/operations';

export const participantsDefaultValues = (
  formData: ParticipantData | undefined
): { defaultValues: DefaultValuesTypes | { speciality: OptionType } } => {
  if (!formData) return { defaultValues: { speciality: membersRole[6] } };
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
      project,
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
      projectsArr: project,
      experience: experienceVariants.find((item) => item.value === (formData.experience ? 'Так' : 'Ні')),
      speciality: {
        value: formData.speciality?.title,
        label: membersRole.find((item) => item.value === formData.speciality?.title)?.label,
      },
      type_participant: {
        value: formData.type_participant.title,
        label: projectType.find((item) => item.value === formData.type_participant.title)?.label,
      },
    };

    return { defaultValues };
  }
};

type DropDownTypes = {
  value: string;
  label: JSX.Element | undefined;
};

export type DefaultValuesTypes = {
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
  projectsArr: {
    id: number;
    label: string;
    title: string;
    projectId: number;
  }[];
};
