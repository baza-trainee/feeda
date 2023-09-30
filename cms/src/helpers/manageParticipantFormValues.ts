export function manageFormFields(formData: FormDataTypes) {
  try {
    const {
      account_discord,
      account_linkedin,
      city,
      comment,
      email,
      experience,
      first_name,
      last_name,
      phone_number,
      stack,
      project,
    } = formData;

    const requestData: RequestDataTypes = {
      account_discord,
      account_linkedin,
      city: city || '',
      comment: comment || '',
      email,
      first_name,
      last_name,
      phone_number,
      project: project.map((item) => item.id),
      stack,
      experience: experience.value === 'Так',
      speciality: 0,
      type_participant: 0,
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
  speciality: number;
  stack: string;
  type_participant: number;
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
  speciality: { value: string };
  stack: string;
  type_participant: { value: string };
  project: { id: number; label: string; title: string }[];
}
