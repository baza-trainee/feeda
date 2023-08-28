import { IdNameType } from '../redux/instructions';

export function manageFormFields(formData: FormDataTypes, instructions: InstructionsTypes) {
  try {
    if (!instructions.specialities || !instructions.participation_types) throw new Error('Instructions not loaded');
    if (typeof formData.experience === 'object') {
      formData.experience = formData.experience.value === 'Так';
    }

    const tmp_spec = instructions.specialities.find(
      (item) => item.title.toLowerCase() === formData.speciality.value.toLowerCase()
    );
    if (!tmp_spec) throw new Error('Speciality not found');
    formData.speciality = tmp_spec.id;

    const tmp_type = instructions.participation_types.find(
      (item) => item.title.toLowerCase() === formData.type_participant.value.toLowerCase()
    );
    if (!tmp_type) throw new Error('Participation type not found');
    formData.type_participant = tmp_type.id;

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
  project: number[];
  speciality: { value: string } | number;
  stack: string;
  type_participant: number | { value: string };
  project_0: { label: string; id: number };
}

export interface InstructionsTypes {
  specialities: IdNameType[];
  participation_types: IdNameType[];
}
