'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Link from 'next/link';

import { ParticipantData, sendEmail } from '~/src/slices/participants';

import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from '../../helpers/regexs';
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
  const dispatch = useDispatch();
  const { control, clearErrors, getValues } = useForm();
  const [projectsAmount, setProjectsAmount] = useState(defaultValues?.project.length || 0);
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
            placeholder="Ім'я"
            defaultValue={defaultValues?.first_name}
            required={true}
            control={control}
            minLength={2}
            maxLength={20}
            pattern={nameRegex.source}
            readonly={formVariant === 'view'}
            clearErrors={clearErrors}
          />
          <Input
            name="last_name"
            label="Прізвище *"
            placeholder="Прізвище"
            required={true}
            minLength={2}
            maxLength={50}
            control={control}
            pattern={nameRegex.source}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.last_name}
            clearErrors={clearErrors}
          />
        </div>
        <div className="stackAndRole" id="two-inputs-wrapper">
          <Input
            name="stack"
            label="Стек *"
            placeholder="HTML,CSS,TS,Node"
            required={true}
            minLength={2}
            maxLength={300}
            control={control}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.stack}
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
            defaultValue={membersRole[6]}
            options={membersRole}
          />
        </div>
        <div id="two-inputs-wrapper">
          <CustomSelect
            name="experience"
            title="Досвід *"
            placeholder="Так/Ні"
            required={true}
            control={control}
            clearErrors={clearErrors}
            valueGetter={(ev) => ev}
            defaultValue={
              defaultValues ? (defaultValues.experience ? experienceVariants[0] : experienceVariants[1]) : null
            }
            options={experienceVariants}
          />
          <CustomSelect
            name="type_participant"
            title="Тип участі *"
            placeholder="Платний"
            readonly={formVariant === 'view'}
            required={true}
            control={control}
            clearErrors={clearErrors}
            valueGetter={(ev) => ev}
            defaultValue={
              defaultValues && projectType.find((item) => item.value === defaultValues?.type_participant.title)
                ? projectType.find((item) => item.value === defaultValues?.type_participant.title)
                : null
            }
            options={projectType}
          />
        </div>
        <div id="two-inputs-wrapper">
          <Input
            name="city"
            label="Місто (Країна)"
            placeholder="Країна"
            minLength={2}
            maxLength={50}
            control={control}
            pattern={cityRegex.source}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.city}
            clearErrors={clearErrors}
          />
          <Input
            name="comment"
            label="Коментар"
            maxLength={50}
            control={control}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.comment}
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
            func={() => defaultValues && dispatch(sendEmail(defaultValues.id))}
          />
        </div>
        <div id="two-inputs-wrapper">
          <Input
            name="account_discord"
            label="Discord *"
            placeholder="XXXX#XXXX"
            required={true}
            minLength={2}
            maxLength={37}
            control={control}
            pattern={discordRegex.source}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.account_discord}
            clearErrors={clearErrors}
          />
          <Input
            name="account_linkedin"
            label="LinkedIn *"
            placeholder="www.linkedin.com/in/"
            type="url"
            required={true}
            minLength={19}
            maxLength={128}
            control={control}
            pattern={linkedRegex.source}
            defaultValue={defaultValues?.account_linkedin}
            readonly={formVariant === 'view'}
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
              // defaultValue={defaultValues?.project[index]}
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
