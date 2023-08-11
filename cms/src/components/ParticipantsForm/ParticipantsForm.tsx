'use client';

import { useForm } from 'react-hook-form';

import { commonVariants } from '~/src/hooks/commonVariants';

import { Button } from '../Button/Button';
import { IconSprite } from '../IconSprite/IconSprite';
import { Input } from '../Input/Input';
import { membersRole } from '../SelectField/lists';
import { CustomSelect } from '../SelectField/SelectField';

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
  const { control, clearErrors, getValues } = useForm();
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { first_name, last_name, stack, speciality } = ev.target;
    console.log(speciality);
    // const form = ev.target as HTMLFormElement;
    // console.log(form);
    // console.log(getValues());
  };
  return (
    <form onSubmit={handleSubmit}>
      <p id="form-part-title">Особиста інформація</p>
      <div id="two-inputs-wrapper">
        <Input name="first_name" label="Ім'я *" required={true} placeholder="Ім'я" />
        <Input name="last_name" label="Прізвище *" required={true} placeholder="Прізвище" />
      </div>
      <div id="two-inputs-wrapper stackRole">
        <Input name="stack" label="Стек *" required={true} placeholder="HTML,CSS,TS,Node" />
        <CustomSelect
          name="speciality"
          title="Роль"
          placeholder="Роль"
          control={control}
          clearErrors={clearErrors}
          valueGetter={(ev) => ev}
          defaultValue={membersRole[6]}
          options={membersRole}
        />
      </div>
      {/* ДОСВІД ТА ТИП УЧАСТІ */}
      <div id="two-inputs-wrapper">
        <Input name="city" label="Місто (Країна)" placeholder="Країна" />
        <Input name="comment" label="Коментар" />
      </div>
      <p id="form-part-title">Контактна інформація</p>
      <div id="two-inputs-wrapper">
        <Input name="account_discord" label="Discord *" placeholder="XXXX#XXXX" required={true} />
        <Input name="account_linkedin" label="LinkedIn *" placeholder="www.linkedin.com/in/" required={true} />
      </div>
      {/*  */}
      <Button btnType="submit" variant="primary" title="submit" />
    </form>
  );
}
/*{
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
