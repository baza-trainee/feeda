'use client';

import { useForm } from 'react-hook-form';

import { commonVariants } from '~/src/hooks/commonVariants';
import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from '~/src/hooks/regexs';

import { Button } from '../Button/Button';
import { IconSprite } from '../IconSprite/IconSprite';
import { Input } from '../Input/Input';
import { experienceVariants, membersRole, projectType } from '../SelectField/lists';
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
  //   console.log(phoneNumberRegex.source);
  return (
    <form onSubmit={handleSubmit}>
      <p id="form-part-title">Особиста інформація</p>
      <div id="two-inputs-wrapper">
        <Input name="first_name" label="Ім'я *" required={true} placeholder="Ім'я" pattern={nameRegex.source} />
        <Input name="last_name" label="Прізвище *" required={true} placeholder="Прізвище" pattern={nameRegex.source} />
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
      <div id="two-inputs-wrapper">
        <CustomSelect
          name="experience"
          title="Досвід *"
          placeholder="Так/Ні"
          rules={{ required: true }}
          control={control}
          clearErrors={clearErrors}
          valueGetter={(ev) => ev}
          //   defaultValue={membersRole[6]}
          options={experienceVariants}
        />
        <CustomSelect
          name="participation_type"
          title="Тип участі *"
          placeholder="Платний"
          rules={{ required: true }}
          control={control}
          clearErrors={clearErrors}
          valueGetter={(ev) => ev}
          //   defaultValue={undefined}
          options={projectType}
        />
      </div>
      <div id="two-inputs-wrapper">
        <Input name="city" label="Місто (Країна)" placeholder="Країна" pattern={cityRegex.source} />
        <Input name="comment" label="Коментар" />
      </div>
      <p id="form-part-title">Контактна інформація</p>
      <div id="two-inputs-wrapper">
        <Input
          name="account_discord"
          label="Discord *"
          placeholder="XXXX#XXXX"
          required={true}
          pattern={discordRegex.source}
        />
        <Input
          name="account_linkedin"
          label="LinkedIn *"
          placeholder="www.linkedin.com/in/"
          type="url"
          required={true}
          pattern={linkedRegex.source}
        />
      </div>
      <div id="two-inputs-wrapper">
        <Input
          name="phone_number"
          label="Телефон *"
          type="tel"
          placeholder="+3 8066 66 58 497"
          required={true}
          pattern={phoneNumberRegex.source}
        />
        <Input
          name="email"
          label="E-mail *"
          placeholder="xxx@xxxx"
          type="email"
          required={true}
          pattern={emailRegex.source}
        />
      </div>
      {/*  */}
      <Button btnType="submit" variant="primary" title="submit" />
    </form>
  );
}
// phone and email
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
