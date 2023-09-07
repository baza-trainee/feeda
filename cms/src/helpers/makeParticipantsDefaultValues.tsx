import { experienceVariants, ListProps, membersRole, projectType } from '../components/SelectField/lists';
import { OptionType } from '../components/SelectField/SelectField';
import { ParticipantData } from '../redux/participants/operations';

export const participantsDefaultValues = (
  formData: ParticipantData | undefined
): ParticipantsDefaultValuesTypes | { speciality: OptionType } => {
  if (!formData)
    return {
      speciality: membersRole[6],
      type_participant: { value: '', label: 'Виберіть стан' },
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
      project,
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
