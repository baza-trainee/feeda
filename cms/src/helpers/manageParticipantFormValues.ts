import { IdNameType } from '../redux/instructions';

export function manageFormFields(formData: FormDataTypes, instructions: InstructionsTypes) {
  try {
    if (!instructions.specialities || !instructions.participation_types) throw new Error('Instructions not loaded');
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
      speciality,
      stack,
      type_participant,
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
      project: [],
      stack,
      experience: experience.value === 'Так',
      speciality: 0,
      type_participant: 0,
    };

    const tmp_spec = instructions.specialities.find(
      (item) => item.title.toLowerCase() === speciality.value.toLowerCase()
    );
    if (!tmp_spec) throw new Error('Speciality not found');
    requestData.speciality = tmp_spec.id;

    const tmp_type = instructions.participation_types.find(
      (item) => item.title.toLowerCase() === type_participant.value.toLowerCase()
    );
    if (!tmp_type) throw new Error('Participation type not found');
    requestData.type_participant = tmp_type.id;

    for (const key in formData) {
      if (key.includes('project_')) {
        requestData.project.push(formData[key].id);
      }
    }

    for (const key in requestData) {
      if (requestData[key as keyof FormDataTypes] === null || requestData[key as keyof FormDataTypes] === undefined) {
        requestData[key] = '';
      }
    }

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
}

export interface InstructionsTypes {
  specialities: IdNameType[];
  participation_types: IdNameType[];
}
