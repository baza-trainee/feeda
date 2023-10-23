import { experienceVariants, ListProps, membersRole, projectType } from '../components/SelectField/lists';
import { OptionType } from '../components/SelectField/SelectField';
import { ParticipantData } from '../redux/participants/operations';

export const participantsDefaultValues = (
  formData: ParticipantData | undefined
): ParticipantsDefaultValuesTypes | { speciality: OptionType } => {
  if (!formData) return { speciality: membersRole[6] };
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
    console.log('formData', formData);

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
      project,
      experience: experienceVariants.find((item) => item.value === (formData.experience ? 'Так' : 'Ні')),
      speciality: {
        value: formData.speciality?.title,
        label: membersRole.find((item) => item.value === formData.role)?.label,
      },
      type: {
        value: formData.type.title,
        label: projectType.find((item) => item.value === formData.type.title)?.label,
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
  speciality: DropDownTypes;
  type: DropDownTypes;
  experience: ListProps | undefined;
  project: {
    id?: number;
    label: string;
    title?: string;
  }[];
};
