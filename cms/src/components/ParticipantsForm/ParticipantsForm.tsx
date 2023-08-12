'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from '~/src/hooks/regexs';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { experienceVariants, membersRole, projectType } from '../SelectField/lists';
import { CustomSelect } from '../SelectField/SelectField';
import { Form } from './ParticipantsForm.styles';

export function ParticipantsForm() {
  const [test, setTest] = useState('');
  console.log(test);
  const { control, clearErrors, getValues } = useForm();
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    console.log('submit');
    // const form = ev.target as HTMLFormElement;
    // console.log(form);
    // console.log(getValues());
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div id="form-part-title">
        <p id="form-part-title">Особиста інформація</p>
        <div id="two-inputs-wrapper">
          <Input name="first_name" label="Ім'я *" required={true} placeholder="Ім'я" pattern={nameRegex.source} />
          <Input
            name="last_name"
            label="Прізвище *"
            required={true}
            placeholder="Прізвище"
            pattern={nameRegex.source}
          />
        </div>
        <div className="stackAndRole" id="two-inputs-wrapper">
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
            name="type_participant"
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
      </div>
      <div id="form-part-title">
        <div id="titleAndButtonWrapper">
          <p id="form-part-title">Контактна інформація</p>
          <Button
            btnType="button"
            variant="text"
            title="Відправити листа"
            isDisabled={true}
            func={() => console.log('Відправити листа')}
          />
        </div>
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
            placeholder="+380666658497"
            required={true}
            pattern={phoneNumberRegex.source}
          />
          <Input
            name="email"
            label="E-mail *"
            placeholder="xxx@xxxx.xxx"
            type="email"
            required={true}
            pattern={emailRegex.source}
          />
        </div>
      </div>
      <div id="titleAndButtonWrapper">
        <p id="form-part-title">Проєкт</p>
        <Button
          btnType="button"
          variant="text"
          title="Додати проєкт"
          icon="plus"
          func={() => console.log('Додати проєкт')}
        />
      </div>
      <div id="two-inputs-wrapper">
        {/* <CustomSelect
          name="project"
          title="Проєкт *"
          placeholder="Назва"
          rules={{ required: true }}
          control={control}
          clearErrors={clearErrors}
          valueGetter={(ev) => ev}
          //   defaultValue={undefined}
          // options={projectType}
        /> */}
      </div>
      <Button btnType="button" variant="primary" title="test" func={() => setTest('ss')} />
      <Button btnType="submit" variant="primary" title="submit" />
    </Form>
  );
}
//   "first_name": "string",
//   "last_name": "string",
//   "speciality": "string",
//   "phone_number": 0,
//   "email": "Unknown Type: email",
//   "account_discord": "string",
//   "account_linkedin": "string",
//   "comment": "string",
//   "city": "string",
//   "experience": true,
//   "project": {},
//   "type_participant": {},
//   "stack": "string"
