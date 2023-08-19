export function manageFormFields(formData) {
  console.log('Managing...', formData);
  formData.experience = formData.experience.value === 'Так' ? true : false;
  //   formData.speciality = formData.speciality?.value;
  formData.speciality = 1;
  formData.type_participant = 1;
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
}
