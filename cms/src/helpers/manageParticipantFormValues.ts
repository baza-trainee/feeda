import { FieldValues } from 'react-hook-form';

export function manageFormFields(formData: FieldValues) {
  try {
    console.log('Form data: ', formData);
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
      role: role.value,
      type: type.value,
      projects: projects.map((item: { id: number }) => {
        return { project: item.id };
      }),
    };

    return requestData;
  } catch (err) {
    console.log('Participant manager err: ', err);
  }
}

interface RequestDataTypes {
  account_discord: string;
  account_linkedin: string;
  city: string | null;
  comment: string | null;
  email: string;
  experience: boolean;
  first_name: string;
  last_name: string;
  phone_number: string;
  projects: { project: number }[];
  role: string;
  stack: string;
  type: number;
}
