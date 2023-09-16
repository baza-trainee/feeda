'use client';

import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Link from 'next/link';

import { participantsDefaultValues } from '~/src/helpers/makeParticipantsDefaultValues';

import { cityRegex, discordRegex, emailRegex, linkedRegex, nameRegex, phoneNumberRegex } from '../../helpers/regexs';
import { ParticipantData, searchProjects, sendEmail } from '../../redux/participants/operations';
import { AppDispatch } from '../../redux/store/store';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { experienceVariants, membersRole, projectType } from '../SelectField/lists';
import { AsyncField, SelectField } from '../SelectField/SelectField';
import { Form } from './ParticipantsForm.styles';

type Props = {
  formData?: ParticipantData;
  formVariant: 'create' | 'edit' | 'view';
  submitFunc?: (formData: FieldValues) => void;
};

export function ParticipantsForm({ submitFunc, formVariant, formData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit, clearErrors, reset } = useForm<FieldValues>({
    defaultValues: participantsDefaultValues(formData),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });

  const projectsSearcher = async (value: string) => {
    return (await dispatch(searchProjects(value))).payload;
  };

  return (
    <Form onSubmit={submitFunc && handleSubmit(submitFunc)}>
      <div id="form-part">
        <p id="form-part-title">Особиста інформація</p>
        <div id="two-inputs-wrapper">
          <Input
            name="first_name"
            label="Ім'я *"
            placeholder="Ім'я"
            rules={{ required: "Це поле обов'язкове до заповнення!" }}
            control={control}
            minLength={2}
            maxLength={20}
            pattern={nameRegex.source}
            readonly={formVariant === 'view'}
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
          />
          <SelectField
            name="role"
            title="Роль"
            placeholder="Роль"
            rules={{ required: "Поле обов'язкове до заповнення!" }}
            isDisabled={formVariant === 'view'}
            control={control}
            options={membersRole}
            clearErrors={clearErrors}
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
            options={experienceVariants}
            clearErrors={clearErrors}
          />
          <SelectField
            name="type"
            title="Тип участі *"
            placeholder="Платний"
            isDisabled={formVariant === 'view'}
            rules={{ required: "Поле обов'язкове до заповнення!" }}
            control={control}
            options={projectType}
            clearErrors={clearErrors}
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
          />
          <Input name="comment" label="Коментар" maxLength={50} control={control} readonly={formVariant === 'view'} />
        </div>
      </div>
      <div id="form-part">
        <div id="titleAndButtonWrapper">
          <p id="form-part-title">Контактна інформація</p>
          <Button
            id="smallFontBtn"
            btnType="button"
            variant="text"
            title="Відправити листа"
            isDisabled={formVariant === 'create'}
            func={() => formData && dispatch(sendEmail(formData.id))}
          />
        </div>
        <div className="contactsInputs">
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
            />
            <Input
              name="account_linkedin"
              label="LinkedIn *"
              placeholder="www.linkedin.com/in/"
              type="text"
              rules={{ required: "Це поле обов'язкове до заповнення!" }}
              minLength={19}
              maxLength={128}
              control={control}
              pattern={linkedRegex.source}
              readonly={formVariant === 'view'}
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
              pattern={phoneNumberRegex.source}
              control={control}
            />
            <Input
              name="email"
              label="E-mail *"
              placeholder="xxx@xxxx.xxx"
              type="email"
              readonly={formVariant === 'view'}
              rules={{ required: "Це поле обов'язкове до заповнення!" }}
              minLength={6}
              maxLength={70}
              pattern={emailRegex.source}
              control={control}
            />
          </div>
        </div>
      </div>
      <div id="form-part">
        <div id="titleAndButtonWrapper">
          <p id="form-part-title">Проєкт</p>
          <Button
            btnType="button"
            id="smallFontBtn"
            variant="text"
            title="Додати проєкт"
            icon="plus"
            isDisabled={formVariant === 'view'}
            func={() => append({ label: null, id: null })}
          />
        </div>
        {fields.map((field, idx) => {
          return (
            <div id="project-wrapper" key={field.id}>
              <AsyncField
                name={`projects.${idx}`}
                title="Проєкт *"
                control={control}
                options={projectsSearcher}
                placeholder="Назва"
                clearErrors={clearErrors}
                isDisabled={formVariant === 'view'}
                rules={{ required: "Поле обов'язкове до заповнення!" }}
              />
              <Button
                btnType="button"
                variant="icon"
                icon="trash"
                isDisabled={formVariant === 'view' || fields.length === 1}
                func={() => {
                  remove(idx);
                }}
              />
            </div>
          );
        })}
      </div>
      <div id="buttons-wrapper">
        {formVariant === 'view' ? (
          <Link href={`/participants/edit/${formData?.id}`}>Редагувати</Link>
        ) : (
          <>
            <Button id="bigFontBtn" btnType="submit" variant="primary" title="Зберегти зміни" />
            <Button
              id="cancelBtn"
              btnType="reset"
              variant="text"
              title="Скасувати"
              func={() => reset(participantsDefaultValues(formData))}
            />
          </>
        )}
      </div>
    </Form>
  );
}
