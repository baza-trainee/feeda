import { IdNameType } from '../redux/instructions';
import { ParticipantsDefaultValuesTypes } from './makeParticipantsDefaultValues';

export function manageFormFields(formData: ParticipantsDefaultValuesTypes, instructions: InstructionsTypes) {
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
      project: project.map((item) => item.id || 0),
      stack,
      experience: experience?.value === 'Так' || false,
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

export interface InstructionsTypes {
  specialities: IdNameType[];
  participation_types: IdNameType[];
}
