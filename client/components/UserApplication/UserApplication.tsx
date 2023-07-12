'use client';
/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { formStyle, formTitle, formWrapperStyle } from './UserApplication.styles';
import { CheckBox } from './сomponents/Checkbox/Checkbox';
import { FormField } from './сomponents/FormField/FormField';
import { CustomSelect } from './сomponents/SelectField/SelectField';

const UserApplication = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		control,
		clearErrors,
		watch,
	} = useForm({
		mode: 'onSubmit',
		reValidateMode: 'onChange',
	});

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [isActivationButton, setIsActivationButton] = useState(false);

	const nameValue = watch('name');
	const lastnameValue = watch('lastname');
	const stackValue = watch('stack');
	const phoneValue = watch('tel');
	const emailValue = watch('email');
	const linkedInvalue = watch('linkedin');
	const discordValue = watch('discord');

	useEffect(() => {
		if (discordValue && nameValue && lastnameValue && stackValue && phoneValue && emailValue && linkedInvalue)
			setIsActivationButton(true);
	}, [discordValue, nameValue, lastnameValue, stackValue, phoneValue, emailValue, linkedInvalue]);

	const onFormSubmit = (data: object) => {
		console.log('data :>> ', data);
		setIsFormSubmitted(true);
		setIsConditionsChecked(false);
		setIsDataChecked(false);
		setTimeout(() => {
			reset();
		}, 0);
	};

	// ===================== checkbox================= //

	const [isConditionsChecked, setIsConditionsChecked] = useState(false);
	const [isDataChecked, setIsDataChecked] = useState(false);

	const handleConditionsCheckboxChange = () => {
		setIsConditionsChecked(!isConditionsChecked);
	};
	const handleDataCheckboxChange = () => {
		setIsDataChecked(!isDataChecked);
	};
	// ===================== checkbox================= //

	return (
		<div css={formWrapperStyle}>
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
							message: 'поле повинно містити мінімум 2 символи',
						},
						maxLength: {
							value: 50,
							message: 'поле повинно містити не більше 50 символів',
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
							message: 'поле повинно містити мінімум 2 символи',
						},
						maxLength: {
							value: 50,
							message: 'поле повинно містити не більше 50 символів',
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
							message: 'поле повинно містити мінімум 2 символи',
						},
						maxLength: {
							value: 300,
							message: 'поле повинно містити не більше 300 символів',
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
							message: `будь ласка введіть номер в такому форматі: ${phoneNumberFormat}`,
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
							message: 'поле повинно містити мінімум 6 символів',
						},
						maxLength: {
							value: 70,
							message: 'поле повинно містити не більше 70 символів',
						},
						pattern: {
							message: 'будь ласка введіть валідну пошту',
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
								message: "введіть валідне ім'я користувача",
								value: discordRegex,
							},

							minLength: {
								value: 2,
								message: 'поле повинно містити мінімум 2 символи',
							},
							maxLength: {
								value: 37,
								message: 'поле повинно містити не більше 37 символів',
							},
						}}
						isFormSubmitted={isFormSubmitted}
					/>
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
							message: 'будь ласка введіть правильну адресу',
							value: linkedRegex,
						},
						minLength: {
							value: 19,
							message: 'поле повинно містити мінімум 19 символів',
						},
						maxLength: {
							value: 128,
							message: 'поле повинно містити не більше 128 символів',
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
							message: 'поле повинно містити мінімум 2 символи',
						},
						maxLength: {
							value: 50,
							message: 'поле повинно містити не більше 50 символів',
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
					rules={{ required: requiredField }}
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
					checked={isConditionsChecked}
					onChange={handleConditionsCheckboxChange}
					href="/"
					labeltxt="Ознайомлений/на з "
					linkText="умовами участі в проєкті *"
				/>

				<CheckBox
					checked={isDataChecked}
					onChange={handleDataCheckboxChange}
					href="/"
					linkText="обробкою персональних даних *"
					labeltxt="Погоджуюсь з "
				/>

				<Title
					isDisabled={!isDataChecked || !isConditionsChecked || !errors || !isActivationButton}
					func={handleSubmit(onFormSubmit)}
				>
					Відправити анкету
				</Title>
			</form>
		</div>
	);
};

export default UserApplication;
