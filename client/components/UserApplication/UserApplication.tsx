'use client';
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { nanoid } from 'nanoid';

import Title from '~components/Button/Button';

import {
	cityPlaceholder,
	cityRegex,
	discordRegex,
	emailPlaceholder,
	emailRegex,
	experiencePlaceholder,
	getExpValue,
	getProjValue,
	getTypeValue,
	lastnamePlaceholder,
	linkedInPlaceholder,
	linkedRegex,
	namePlaceholder,
	nameRegex,
	phoneNumberFormat,
	phoneNumberRegex,
	projectPlaceholder,
	requiredField,
	stackPlaceholder,
	typePlaceholder,
} from './helpers';
import { experience, projects, type } from './lists';
import { formStyle, formTitle, formWrapperStyle, vaidDiscordUnderText } from './UserApplication.styles';
import { CheckBox } from './сomponents/Checkbox/Checkbox';
import { FormField } from './сomponents/FormField/FormField';
import { CustomSelect } from './сomponents/SelectField/SelectField';

const UserApplication = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		control,
		clearErrors,
		watch,
	} = useForm({ mode: 'onBlur' });

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	//===========discord============//
	const discordValue = watch('discord');
	// console.log('discordValue', discordValue);
	const isValidDiscordValue = discordValue !== '' && discordRegex.test(discordValue);
	// console.log('isValidDiscordValue :>> ', isValidDiscordValue);
	//===========discord============//
	const onFormSubmit = (data: object) => {
		setIsFormSubmitted(true);
		console.log('data :>> ', data);
		reset();
		setIsСonditionsChecked(false);
		setIsDataChecked(false);
	};
	// Discord hook
	// const [shouldDisplayMessage, onHandleDiscordChange, onBlurDiscord] = useDiscordValidation(discordRegex, clearErrors);

	// ===================== checkbox================= //
	const conditionsId = nanoid();
	const dataId = nanoid();
	const [isСonditionsChecked, setIsСonditionsChecked] = useState(false);
	const [isDataChecked, setIsDataChecked] = useState(false);

	const handleСonditionsCheckboxChange = () => {
		setIsСonditionsChecked(!isСonditionsChecked);
	};
	const handleDataCheckboxChange = () => {
		setIsDataChecked(!isDataChecked);
	};
	// ===================== checkbox================= //

	return (
		<div css={formWrapperStyle}>
			{' '}
			<form css={formStyle} onSubmit={handleSubmit(onFormSubmit)}>
				<h1 css={formTitle}>Анкета</h1>
				<FormField
					label="Ім'я *"
					autoComplete="on"
					type="text"
					placeholder={namePlaceholder}
					register={register}
					name="name"
					errors={errors?.name}
					inputProps={{
						required: requiredField,
						minLength: {
							value: 2,
							message: 'minimum length 2 characters',
						},
						maxLength: {
							value: 50,
							message: 'maximum length 50 characters',
						},
						pattern: {
							value: nameRegex,
							message: 'please enter valid name',
						},
					}}
				/>

				<FormField
					label="Прізвище *"
					autoComplete="off"
					type="text"
					placeholder={lastnamePlaceholder}
					register={register}
					name="lastname"
					errors={errors?.lastname}
					inputProps={{
						required: requiredField,
						minLength: {
							value: 2,
							message: 'minimum length 2 characters',
						},
						maxLength: {
							value: 50,
							message: 'maximum length 50 characters',
						},
					}}
				/>

				<FormField
					label="Спеціалізація (стек) *"
					autoComplete="off"
					type="text"
					placeholder={stackPlaceholder}
					register={register}
					name="stack"
					errors={errors?.stack}
					inputProps={{
						required: requiredField,
						minLength: {
							value: 2,
							message: 'minimum length 2 characters',
						},
						maxLength: {
							value: 300,
							message: 'maximum length 300 characters',
						},
					}}
				/>

				<FormField
					label="Телефон *"
					autoComplete="on"
					type="tel"
					placeholder={phoneNumberFormat}
					register={register}
					name="tel"
					errors={errors?.tel}
					inputProps={{
						required: requiredField,
						pattern: {
							message: `please enter the number in this format: ${phoneNumberFormat}`,
							value: phoneNumberRegex,
						},
					}}
				/>

				<FormField
					label="Електронна пошта *"
					autoComplete="on"
					type="email"
					placeholder={emailPlaceholder}
					register={register}
					name="email"
					errors={errors?.email}
					inputProps={{
						required: requiredField,
						minLength: {
							value: 6,
							message: 'minimum length 6 characters',
						},
						maxLength: {
							value: 70,
							message: 'maximum length 70 characters',
						},
						pattern: {
							message: 'Please enter valid email!',
							value: emailRegex,
						},
					}}
				/>

				<div>
					<FormField
						label="Акаунт в Discord *"
						autoComplete="off"
						type="text"
						register={register}
						name="discord"
						errors={errors?.discord}
						inputProps={{
							required: requiredField,

							pattern: {
								message: 'Please enter valid discord name!',
								value: discordRegex,
							},

							minLength: {
								value: 2,
								message: 'minimum length 2 characters',
							},
							maxLength: {
								value: 37,
								message: 'maximum length 37 characters',
							},
						}}
						isFormSubmitted={isFormSubmitted}
					/>
					{!errors.discord && discordValue !== undefined && isValidDiscordValue && (
						<span css={vaidDiscordUnderText}>Не забудь перевірити запрошення</span>
					)}
				</div>

				<FormField
					label="Акаунт в LinkedIn *"
					autoComplete="off"
					type="text"
					placeholder={linkedInPlaceholder}
					register={register}
					name="linkedin"
					errors={errors?.linkedin}
					inputProps={{
						required: requiredField,
						pattern: {
							message: 'Please enter valid link on your profile!',
							value: linkedRegex,
						},
						minLength: {
							value: 19,
							message: 'minimum length 19 characters',
						},
						maxLength: {
							value: 128,
							message: 'maximum length 128 characters',
						},
					}}
				/>

				<FormField
					label="Місто (Країна)"
					autoComplete="off"
					type="text"
					placeholder={cityPlaceholder}
					register={register}
					name="city"
					errors={errors?.city}
					inputProps={{
						minLength: {
							value: 2,
							message: 'minimum length 2 characters',
						},
						maxLength: {
							value: 50,
							message: 'maximum length 50 characters',
						},
						pattern: {
							message: 'please enter valid value',
							value: cityRegex,
						},
					}}
				/>

				<CustomSelect
					title={'Наявність досвіду  *'}
					control={control}
					name="experience"
					rules={{ required: "Це поле обов'язкове" }}
					options={experience}
					placeholder={experiencePlaceholder}
					clearErrors={clearErrors}
					valueGetter={(value) => getExpValue(value)}
				/>
				<CustomSelect
					title={'Тип участі *'}
					control={control}
					name="type"
					rules={{ required: requiredField }}
					options={type}
					placeholder={typePlaceholder}
					clearErrors={clearErrors}
					valueGetter={(value) => getTypeValue(value)}
				/>
				<CustomSelect
					title={'Проєкт на вибір *'}
					control={control}
					name="projects"
					rules={{ required: requiredField }}
					options={projects}
					placeholder={projectPlaceholder}
					clearErrors={clearErrors}
					valueGetter={(value) => getProjValue(value)}
				/>

				<CheckBox
					checked={isСonditionsChecked}
					onChange={handleСonditionsCheckboxChange}
					id={conditionsId}
					href="/"
					labeltxt="Ознайомлений/на з "
					linkText="умовами участі в проєкті *"
				/>

				<CheckBox
					checked={isDataChecked}
					onChange={handleDataCheckboxChange}
					id={dataId}
					href="/"
					linkText="обробкою персональних даних *"
					labeltxt="Погоджуюсь з "
				/>

				<Title isDisabled={!isDataChecked || !isСonditionsChecked || !isValid} func={handleSubmit(onFormSubmit)}>
					Відправити анкету
				</Title>
			</form>
		</div>
	);
};

export default UserApplication;
