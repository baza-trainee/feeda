export function manageFormFields(formData: FormDataTypes) {
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
      stack,
      project,
      type_participant,
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
      //role: role.value,
      type_participant: type_participant.value,
      projects: project.map((item: { id: number }) => {
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
  //role: string;
  stack: string;
  type_participant: string;
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
