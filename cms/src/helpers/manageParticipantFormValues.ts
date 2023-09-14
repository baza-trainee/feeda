import { FieldValues } from 'react-hook-form';

export function manageFormFields(formData: FieldValues) {
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
      role,
      stack,
      type,
      projects,
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
      stack,
      experience: experience?.value === 'Так' || false,
      role: role.value,
      type: type.value,
      projects: projects.map((item: { id: number }) => {
        return { project: item.id };
      }),
    };

    // const tmp_spec = instructions.specialities.find(
    //   (item) => item.title.toLowerCase() === speciality.value.toLowerCase()
    // );
    // if (!tmp_spec) throw new Error('Speciality not found');
    // requestData.speciality = tmp_spec.id;

    // const tmp_type = instructions.participation_types.find(
    //   (item) => item.title.toLowerCase() === type_participant.value.toLowerCase()
    // );
    // if (!tmp_type) throw new Error('Participation type not found');
    // requestData.type_participant = tmp_type.id;

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
