'use client';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { CustomSelect } from '../SelectField/SelectField';

/*
{
  "first_name": "string",
  "last_name": "string",
  "speciality": "string",
  "phone_number": 0,
  "email": "Unknown Type: email",
  "account_discord": "string",
  "account_linkedin": "string",
  "city": "string",
  "experience": true,
  "project": "string",
  "stack": "string",
  "conditions_participation": true,
  "processing_personal_data": true
} */

// 'button' |
//   'checkbox' |
//   'color' |
//   'date' |
//   'datetime-local' |
//   'email' |
//   'file' |
//   'hidden' |
//   'image' |
//   'month' |
//   'number' |
//   'password' |
//   'radio' |
//   'range' |
//   'reset' |
//   'search' |
//   'submit' |
//   'tel' |
//   'text' |
//   'time' |
//   'url' |
//   'week';

export function ParticipantsForm() {
  return (
    <form onSubmit={(ev) => console.log(ev.target.value)}>
      <p id="form-part-title">Особиста інформація</p>
      <div id="two-inputs-wrapper">
        <Input name="first_name" label="Ім'я *" required={true} placeholder="Ім'я" />
        <Input name="last_name" label="Прізвище *" required={true} placeholder="Прізвище" />
      </div>
      <div id="two-inputs-wrapper">
        <Input name="stack" label="Стек *" required={true} placeholder="HTML,CSS,TS,Node" />
        {/* <CustomSelect name="speciality" placeholder="Роль" /> */}
      </div>
      <Button btnType="submit" variant="primary" title="submit" />
    </form>
  );
}
