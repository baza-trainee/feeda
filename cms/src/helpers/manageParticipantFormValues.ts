import { IdNameType } from '../redux/instructions';

export function manageFormFields(formData: FormDataTypes, instructions: InstructionsTypes) {
  try {
    formData.experience = formData.experience.value === 'Так' ? true : false;
    formData.speciality = instructions.specialities?.find(
      (item) => item.title.toLowerCase() === formData.speciality?.value.toLowerCase()
    )?.id;
    formData.type_participant = instructions.participation_types?.find(
      (item) => item.title.toLowerCase() === formData.type_participant?.value.toLowerCase()
    )?.id;
    formData.project = [];
    for (const key in formData) {
      if (key.includes('project_')) {
        formData.project.push(formData[key].id);
        delete formData[key as keyof FormDataTypes];
      } else if (formData[key as keyof FormDataTypes] === null || formData[key as keyof FormDataTypes] === undefined) {
        formData[key] = '';
      }
    }
  } catch (err) {
    console.log('Participant manager err: ', err);
  }
}

export interface FormDataTypes {
  account_discord: string;
  account_linkedin: string;
  city?: string;
  comment?: string;
  email: string;
  experience: { value: string } | boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  project: [];
  speciality?: number | { value: string };
  stack: string;
  type_participant?: number | { value: string };
}

export interface InstructionsTypes {
  specialities: IdNameType[];
  participation_types: IdNameType[];
}
