import { FieldValues } from 'react-hook-form';
export function manageFormFields(formData: FieldValues) {
  try {
    const {
      account_discord,
      account_linkedin,
      city = '',
      comment = '',
      email,
      experience,
      first_name,
      last_name,
      phone_number,
      role,
      stack,
      type,
      projects,
    } = formData;

    const requestData: RequestDataTypes = {
      account_discord,
      account_linkedin,
      city,
      comment,
      email,
      first_name,
      last_name,
      phone_number,
      stack,
      experience: experience?.value === 'Так' || false,
      role,
      type: +type.value,
      projects: projects.map((item: { id: number }) => {
        return { project: item.id };
      }),
      project: [],
      speciality: 0,
    };
    return requestData;
  } catch (err) {
    console.log('Participant manager err: ', err);
  }
}

interface RequestDataTypes {
  account_discord: string;
  account_linkedin: string;
  city: string;
  comment: string;
  email: string;
  experience: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  project: number[];
  role: string;
  speciality: number;
  stack: string;
  type: number;
  projects: { id: number; label: string; title: string }[];
}

export interface FormDataTypes {
  account_discord: string;
  account_linkedin: string;
  city?: string;
  comment?: string;
  email: string;
  experience: { value: string };
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  speciality: { value: string };
  stack: string;
  type: { value: string };
  projects: { id: number; label: string; title: string }[];
}
