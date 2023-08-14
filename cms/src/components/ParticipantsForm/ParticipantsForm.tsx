'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { ParticipantData } from '~/src/slices/participants';

import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from '../../hooks/regexs';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { experienceVariants, membersRole, projectType } from '../SelectField/lists';
import { CustomSelect } from '../SelectField/SelectField';
import { Form } from './ParticipantsForm.styles';

type Props = {
  handleSubmit?: (formData: object) => void;
  formVariant: 'create' | 'edit' | 'view';
  defaultValues?: ParticipantData;
};

export function ParticipantsForm({ handleSubmit, formVariant, defaultValues }: Props) {
  const { control, clearErrors, getValues } = useForm();
  const [projectsAmount, setProjectsAmount] = useState(0);
  console.log(defaultValues);
  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();
        formVariant !== 'view' && handleSubmit(getValues());
      }}
    >
      <div id="form-part">
        <p id="form-part-title">Особиста інформація</p>
        <div id="two-inputs-wrapper">
          <Input
            name="first_name"
            label="Ім'я *"
            readonly={formVariant === 'view'}
            required={true}
            placeholder="Ім'я"
            defaultValue={defaultValues?.first_name}
            pattern={nameRegex.source}
            control={control}
            clearErrors={clearErrors}
          />
          <Input
            name="last_name"
            label="Прізвище *"
            readonly={formVariant === 'view'}
            required={true}
            placeholder="Прізвище"
            defaultValue={defaultValues?.last_name}
            pattern={nameRegex.source}
            control={control}
            clearErrors={clearErrors}
          />
        </div>
        <div className="stackAndRole" id="two-inputs-wrapper">
          <Input
            name="stack"
            label="Стек *"
            readonly={formVariant === 'view'}
            required={true}
            defaultValue={defaultValues?.stack}
            placeholder="HTML,CSS,TS,Node"
            control={control}
            clearErrors={clearErrors}
          />
          <CustomSelect
            name="speciality"
            title="Роль"
            placeholder="Роль"
            // readonly={formVariant === 'view' }
            control={control}
            clearErrors={clearErrors}
            valueGetter={(ev) => ev}
            defaultValue={
              defaultValues && membersRole.find((item) => item.value === defaultValues?.speciality.title.toLowerCase())
                ? membersRole.find((item) => item.value === defaultValues?.speciality.title.toLowerCase())
                : membersRole[6]
            }
            options={membersRole}
          />
        </div>
        <div id="two-inputs-wrapper">
          <CustomSelect
            name="experience"
            title="Досвід *"
            placeholder="Так/Ні"
            // readonly={formVariant === 'view' }
            rules={{ required: true }}
            control={control}
            clearErrors={clearErrors}
            valueGetter={(ev) => ev}
            defaultValue={defaultValues?.experience ? experienceVariants[0] : experienceVariants[1]}
            options={experienceVariants}
          />
          <CustomSelect
            name="type_participant"
            title="Тип участі *"
            placeholder="Платний"
            readonly={formVariant === 'view'}
            rules={{ required: true }}
            control={control}
            clearErrors={clearErrors}
            valueGetter={(ev) => ev}
            defaultValue={
              defaultValues && projectType.find((item) => item === defaultValues?.type_participant)?.value ? (
                projectType.find((item) => item === defaultValues?.type_participant)?.value
              ) : (
                <></>
              )
            }
            options={projectType}
          />
        </div>
        <div id="two-inputs-wrapper">
          <Input
            name="city"
            label="Місто (Країна)"
            placeholder="Країна"
            readonly={formVariant === 'view'}
            pattern={cityRegex.source}
            defaultValue={defaultValues?.city}
            control={control}
            clearErrors={clearErrors}
          />
          <Input
            name="comment"
            label="Коментар"
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.comment}
            control={control}
            clearErrors={clearErrors}
          />
        </div>
      </div>
      <div id="form-part">
        <div id="titleAndButtonWrapper">
          <p id="form-part-title">Контактна інформація</p>
          <Button
            btnType="button"
            variant="text"
            title="Відправити листа"
            isDisabled={formVariant === 'create'}
            func={() => console.log('Відправити листа')}
          />
        </div>
        <div id="two-inputs-wrapper">
          <Input
            name="account_discord"
            label="Discord *"
            placeholder="XXXX#XXXX"
            required={true}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.account_discord}
            pattern={discordRegex.source}
            control={control}
            clearErrors={clearErrors}
          />
          <Input
            name="account_linkedin"
            label="LinkedIn *"
            placeholder="www.linkedin.com/in/"
            type="url"
            readonly={formVariant === 'view'}
            required={true}
            defaultValue={defaultValues?.account_linkedin}
            pattern={linkedRegex.source}
            control={control}
            clearErrors={clearErrors}
          />
        </div>
        <div id="two-inputs-wrapper">
          <Input
            name="phone_number"
            label="Телефон *"
            type="tel"
            placeholder="+XXXXXXXXXXXX"
            readonly={formVariant === 'view'}
            required={true}
            defaultValue={defaultValues?.phone_number}
            pattern={phoneNumberRegex.source}
            control={control}
            clearErrors={clearErrors}
          />
          <Input
            name="email"
            label="E-mail *"
            placeholder="xxx@xxxx.xxx"
            type="email"
            readonly={formVariant === 'view'}
            required={true}
            defaultValue={defaultValues?.email}
            minLength={6}
            maxLength={70}
            pattern={emailRegex.source}
            control={control}
            clearErrors={clearErrors}
          />
        </div>
      </div>
      <div id="form-part">
        <div id="titleAndButtonWrapper">
          <p id="form-part-title">Проєкт</p>
          <Button
            btnType="button"
            variant="text"
            title="Додати проєкт"
            icon="plus"
            isDisabled={formVariant === 'view'}
            func={() => setProjectsAmount(projectsAmount + 1)}
          />
        </div>
        {Array.from({ length: projectsAmount }, (_, index) => (
          <div id="project-wrapper" key={index}>
            <CustomSelect
              name={`project_${index}`}
              title="Проєкт *"
              placeholder="Назва"
              rules={{ required: true }}
              control={control}
              clearErrors={clearErrors}
              // readonly={formVariant === 'view' }
              valueGetter={(ev) => ev}
              //   defaultValue={undefined}
              options={projectType}
            />
            <Button btnType="button" variant="icon" icon="trash" func={() => setProjectsAmount(projectsAmount - 1)} />
          </div>
        ))}
      </div>

      <div id="buttons-wrapper">
        {formVariant === 'view' ? (
          <Link href={`/participants/edit/${defaultValues?.id}`}>Редагувати</Link>
        ) : (
          <>
            <Button btnType="submit" variant="primary" title="Зберегти зміни" />
            <Button btnType="reset" variant="text" title="Скасувати" />
          </>
        )}
      </div>
    </Form>
  );
}
