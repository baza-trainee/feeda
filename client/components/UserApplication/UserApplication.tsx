'use client';
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Title from '~components/Button/Button';

// import { useDiscordValidation } from './ hooks/useDiscordValidation';
import {
	cityPlaceholder,
	cityRegex,
	discordRegex,
	discordSecondRegex,
	emailPlaceholder,
	emailRegex,
	experiencePlaceholder,
	getExpValue,
	getProjValue,
	getTypeValue,
	// handleNameChange,
	// handleSurnameChange,
	lastnamePlaceholder,
	linkedInPlaceholder,
	linkedRegex,
	namePlaceholder,
	nameRegex,
	// onHandleCityChange,
	// onHandleDiscordChange,
	// onHandleEmailChange,
	// onHandleLinkedChange,
	// onHandlePhoneChange,
	// onHandleStackChange,
	phoneNumberFormat,
	phoneNumberRegex,
	projectPlaceholder,
	requiredField,
	stackPlaceholder,
	typePlaceholder,
	useCustomIds,
} from './helpers';
import { experience, projects, type } from './lists';
import { formStyle, formTitle, formWrapperStyle } from './UserApplication.styles';
import { CheckBox } from './сomponents/Checkbox/Checkbox';
import { FormField } from './сomponents/FormField/FormField';
import { CustomSelect } from './сomponents/SelectField/SelectField';

// interface IDiscord {
// 	(fieldName: string, value: string): void;
// }

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

	//===========discord============//
	const discordValue = watch('discord');
	const isValidDiscordValue = discordRegex.test(discordValue);

	//===========discord============//
	const onFormSubmit = (data: object) => {
		// alert(JSON.stringify(data));

		console.log('data :>> ', data);
		reset();
		setIsСonditionsChecked(false);
		setIsDataChecked(false);
	};
	// Discord hook
	// const [shouldDisplayMessage, onHandleDiscordChange, onBlurDiscord] = useDiscordValidation(discordRegex, clearErrors);

	// ===================== checkbox================= //
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
					// onChange={(name: string, value: string) => handleNameChange(name, value, clearErrors)}
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
					// onChange={(name: string, value: string) => handleSurnameChange(name, value, clearErrors)}
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
					// onChange={(name: string, value: string) => onHandleStackChange(name, value, clearErrors)}
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
					// onChange={(name: string, value: string) => onHandlePhoneChange(name, value, clearErrors)}
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
					// onChange={(name: string, value: string) => onHandleEmailChange(name, value, clearErrors)}
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
								value: discordRegex || discordSecondRegex,
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
						// onBlur={setValidDiscord}
					/>
					{!errors.discord && isValidDiscordValue && (
						<span css={{ color: '#14905D', fontSize: '12px', position: 'absolute' }}>
							Не забудь перевірити запрошення
						</span>
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
					// onChange={(name: string, value: string) => onHandleLinkedChange(name, value, clearErrors)}
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
					// onChange={(name: string, value: string) => onHandleCityChange(name, value, clearErrors)}
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

				{/* <Controller
					control={control}
					name="experience"
					rules={{ required: requiredField }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('experience'); // Викликаємо clearErrors для поля "projects"
						};

						return (
							<div>
								<label css={labelStyles}>
									Наявність досвіду *
									<Select
										instanceId={experienceId}
										isSearchable={false}
										styles={{
											control: (provided) => ({
												...provided,

												border: `1px solid ${theme.colors.disabledBtnBg}`,
												boxShadow: 'none',
												borderRadius: '4px',
												padding: '16px',
											}),
											indicatorSeparator: () => ({
												display: 'none',
											}),
											valueContainer: (provided) => ({
												...provided,
												padding: 0,
												margin: 0,
											}),

											input: (provided) => ({
												...provided,
												margin: 0,
											}),

											dropdownIndicator: () => ({
												padding: 0,
												display: 'flex',
												alingItems: 'center',
												justifyContent: 'center',
												color: `${theme.colors.mainPlaceholder}`,
											}),
										}}
										placeholder="Так / Ні"
										options={experience}
										value={getExpValue(value)}
										onChange={(value) => {
											onChange(value);
											handleSelectChange();
										}}
										onBlur={() => onBlur()}
									/>
								</label>
								{error && (
									<span style={{ color: '#DF4242', display: 'block', marginTop: '4px', fontSize: '12px' }}>
										{error.message}
									</span>
								)}
							</div>
						);
					}}
				/>
				<Controller
					control={control}
					name="type"
					rules={{ required: requiredField }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('type'); // Викликаємо clearErrors для поля "projects"
						};
						return (
							<div>
								<label css={labelStyles}>
									Тип участі *
									<Select
										instanceId={typeId}
										isSearchable={false}
										styles={{
											control: (provided) => ({
												...provided,

												border: `1px solid ${theme.colors.disabledBtnBg}`,
												boxShadow: 'none',
												borderRadius: '4px',
												padding: '16px',
											}),
											indicatorSeparator: () => ({
												display: 'none',
											}),
											valueContainer: (provided) => ({
												...provided,
												padding: 0,
												margin: 0,
											}),

											input: (provided) => ({
												...provided,
												margin: 0,
											}),
											// indicatorsContainer: () => ({
											// 	display: 'none',
											// }),
											dropdownIndicator: () => ({
												padding: 0,
												display: 'flex',
												alingItems: 'center',
												justifyContent: 'center',
												color: `${theme.colors.mainPlaceholder}`,
											}),
										}}
										placeholder="Тип участі"
										options={type}
										value={getTypeValue(value)}
										onChange={(value) => {
											onChange(value);
											handleSelectChange();
										}}
										onBlur={() => onBlur()}
									/>
								</label>
								{error && (
									<span style={{ color: '#DF4242', display: 'block', marginTop: '4px', fontSize: '12px' }}>
										{error.message}
									</span>
								)}
							</div>
						);
					}}
				/>

				<Controller
					control={control}
					name="projects"
					rules={{ required: requiredField }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('projects'); // Викликаємо clearErrors для поля "projects"
						};
						return (
							<div>
								<label css={labelStyles}>
									Проєкт на вибір *
									<Select
										instanceId={projectId}
										isSearchable={false}
										styles={{
											control: (provided) => ({
												...provided,

												border: `1px solid ${theme.colors.disabledBtnBg}`,
												boxShadow: 'none',
												borderRadius: '4px',
												padding: '16px',
											}),
											indicatorSeparator: () => ({
												display: 'none',
											}),
											valueContainer: (provided) => ({
												...provided,
												padding: 0,
												margin: 0,
											}),

											input: (provided) => ({
												...provided,
												margin: 0,
											}),
											// indicatorsContainer: () => ({
											// 	display: 'none',
											// }),
											dropdownIndicator: () => ({
												padding: 0,
												display: 'flex',
												alingItems: 'center',
												justifyContent: 'center',
												color: `${theme.colors.mainPlaceholder}`,
											}),
										}}
										placeholder="Проєкт"
										options={projects}
										value={getProjValue(value)}
										onChange={(value) => {
											onChange(value);
											handleSelectChange();
										}}
										onBlur={() => onBlur()}
									/>
								</label>
								{error && (
									<span style={{ color: '#DF4242', display: 'block', marginTop: '4px', fontSize: '12px' }}>
										{error.message}
									</span>
								)}
							</div>
						);
					}}
				/> */}

				<CheckBox
					checked={isСonditionsChecked}
					onChange={handleСonditionsCheckboxChange}
					id="ijd"
					href="/"
					labeltxt="Ознайомлений/на з "
					linkText="умовами участі в проєкті *"
				/>

				<CheckBox
					checked={isDataChecked}
					onChange={handleDataCheckboxChange}
					id="ijs"
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
