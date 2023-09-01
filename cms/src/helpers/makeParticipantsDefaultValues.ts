import { experienceVariants, ListProps, membersRole, projectType } from '../components/SelectField/lists';
import { ParticipantData } from '../redux/participants/operations';

export const participantsDefaultValues = (formData: ParticipantData | undefined) => {
  if (!formData) return { defaultValues: { speciality: { ...membersRole[6] } } };
  else {
    const defaultValues: DefaultValuesTypes = { ...formData };
    defaultValues.speciality = {
      value: formData.speciality?.title,
      label: membersRole.find((item) => item.value === formData.speciality?.title)?.label,
    };
    defaultValues.type_participant = {
      value: formData.type_participant.title,
      label: projectType.find((item) => item.value === formData.type_participant.title)?.label,
    };
    defaultValues.experience = experienceVariants.find((item) => item.value === (formData.experience ? 'Так' : 'Ні'));
    defaultValues.projectsArr = formData.project;
    return { defaultValues };
  }
};

type DropDownTypes = {
  value: string;
  label: JSX.Element | undefined;
};

type DefaultValuesTypes = {
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
  processing_personal_data: boolean;
  project: { id: number; label: string; title: string; projectId: number }[];
  project_count: number;
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
