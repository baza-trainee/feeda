import { IdNameType } from '../slices/instructions';

export function manageFormFields(formData, instructions) {
  try {
    console.log(formData);
    formData.experience = formData.experience.value === 'Так' ? true : false;
    formData.speciality = instructions.specialities.find(
      (item) => item.title.toLowerCase() === formData.speciality?.value.toLowerCase()
    )?.id;
    formData.type_participant = instructions.participation_types.find(
      (item) => item.title.toLowerCase() === formData.type_participant?.value.toLowerCase()
    )?.id;
    formData.project = [];
    for (const key in formData) {
      if (key.includes('project_')) {
        formData[key]?.value && formData.project.push(formData[key].value);
        delete formData[key];
      } else if (formData[key] === null) {
        console.log(formData[key]);
        formData[key] = '';
      }
    }
  } catch (err) {
    console.log('Participant manager err: ', err);
  }
}

// interface ManagerTypes {
//   formData: {
//     account_discord: any;
//     account_linkedin: any;
//     city?: any;
//     comment?: any;
//     email: any;
//     experience: { value: any };
//     first_name: any;
//     last_name: any;
//     phone_number: any;
//     project: [];
//     speciality?: number | { value: any };
//     stack: any;
//     type_participant?: number | { value: any };
//   };
//   instructions: {
//     specialities: IdNameType[];
//     participation_types: IdNameType[];
//   };
// }

// interface ManagerTypes {
//   formData: {
//     account_discord: string;
//     account_linkedin: string;
//     city?: string;
//     comment?: string;
//     email: string;
//     // experience: { value: string } | boolean;
//     first_name: string;
//     last_name: string;
//     phone_number: string;
//     project: [];
//     // speciality?: number | { value: string };
//     stack: string;
//     // type_participant?: number | { value: string };
//   };
//   instructions: {
//     specialities: IdNameType[];
//     participation_types: IdNameType[];
//   };
// }
