'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import throttle from 'lodash.throttle';
import Link from 'next/link';

import { FormDataTypes } from '../../helpers/manageParticipantFormValues';
import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from '../../helpers/regexs';
import { ParticipantData, searchProjects, sendEmail } from '../../redux/participants/operations';
import { AppDispatch } from '../../redux/store/store';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { experienceVariants, membersRole, projectType } from '../SelectField/lists';
import { AsyncField, SelectField } from '../SelectField/SelectField';
import { Form } from './ParticipantsForm.styles';

type Props = {
  formVariant: 'create' | 'edit' | 'view';
  submitFunc?: (formData: FormDataTypes) => void;
  defaultValues?: ParticipantData;
};

export function ParticipantsForm({ submitFunc, formVariant, defaultValues }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [projectsAmount, setProjectsAmount] = useState(
    (defaultValues && Object.keys(defaultValues.project).length) || 0
  );
  const { control, clearErrors, unregister, handleSubmit } = useForm(
    defaultValues && {
      defaultValues: {
        speciality: {
          value: defaultValues.speciality.title,
          label: membersRole.find((item) => item.value === defaultValues.speciality.title)?.label,
        },
        type_participant: {
          value: defaultValues.type_participant.title,
          label: projectType.find((item) => item.value === defaultValues.type_participant.title)?.label,
        },
        experience: experienceVariants.find((item) => item.value == (defaultValues.experience ? 'Так' : 'Ні')),
        ...defaultValues.project,
      },
    }
  );

  const projectsSearcher = throttle(async (value: string) => {
    const { payload } = await dispatch<{ payload: { id: number; title: string }[] }>(searchProjects(value));
    for (const item of payload) {
      item.label = item.title;
      delete item.title;
    }
    return payload;
  }, 400);

  return (
    <Form onSubmit={handleSubmit(submitFunc)}>
      <div id="form-part">
        <p id="form-part-title">Особиста інформація</p>
        <div id="two-inputs-wrapper">
          <Input
            name="first_name"
            label="Ім'я *"
            placeholder="Ім'я"
            defaultValue={defaultValues?.first_name}
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
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
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
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
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
            minLength={2}
            maxLength={300}
            control={control}
            readonly={formVariant === 'view'}
            defaultValue={defaultValues?.stack}
            clearErrors={clearErrors}
          />
          <SelectField
            name="speciality"
            title="Роль"
            placeholder="Роль"
            rules={{ required: "Поле обов'язкове до заповнення!" }}
            isDisabled={formVariant === 'view'}
            control={control}
            clearErrors={clearErrors}
            options={membersRole}
          />
        </div>
        <div id="two-inputs-wrapper">
          <SelectField
            name="experience"
            title="Досвід *"
            placeholder="Так/Ні"
            isDisabled={formVariant === 'view'}
            rules={{ required: "Поле обов'язкове до заповнення!" }}
            control={control}
            clearErrors={clearErrors}
            options={experienceVariants}
          />
          <SelectField
            name="type_participant"
            title="Тип участі *"
            placeholder="Платний"
            isDisabled={formVariant === 'view'}
            rules={{ required: "Поле обов'язкове до заповнення!" }}
            control={control}
            clearErrors={clearErrors}
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
            func={() => defaultValues && dispatch(sendEmail(defaultValues?.id))}
          />
        </div>
        <div id="two-inputs-wrapper">
          <Input
            name="account_discord"
            label="Discord *"
            placeholder="XXXX#XXXX"
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
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
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
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
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
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
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
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
            <AsyncField
              name={`project_${index}`}
              title="Проєкт *"
              control={control}
              rules={{ required: "Поле обов'язкове до заповнення!" }}
              clearErrors={clearErrors}
              options={projectsSearcher}
              placeholder="Назва"
            />
            <Button
              btnType="button"
              variant="icon"
              icon="trash"
              isDisabled={formVariant === 'view'}
              func={() => {
                setProjectsAmount(projectsAmount - 1);
                unregister(`project_${index}`);
              }}
            />
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
