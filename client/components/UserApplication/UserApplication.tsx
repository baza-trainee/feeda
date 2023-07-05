'use client';
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { theme } from 'styles/theme';

import Title from '~components/Button/Button';

import {
	discordRegex,
	emailRegex,
	getExpValue,
	getProjValue,
	getTypeValue,
	handleNameChange,
	handleSurnameChange,
	linkedRegex,
	onHandleCityChange,
	onHandleEmailChange,
	onHandleLinkedChange,
	onHandlePhoneChange,
	onHandleStackChange,
	phoneNumberFormat,
	phoneNumberRegex,
	requiredField,
	useCustomIds,
} from './helpers';
import { experience, projects, type } from './lists';
import { formStyle, formTitle, formWrapperStyle } from './UserApplication.styles';
import { CheckBox } from './сomponents/Checkbox/Checkbox';
import { FormField } from './сomponents/FormField/FormField';
import { labelStyles } from './сomponents/FormField/FormField.slyles';
import { CustomSelect } from './сomponents/SelectField/SelectField';

interface IDiscord {
	(fieldName: string, value: string): void;
}

const UserApplication = () => {
	const {
		register,
		formState: { errors, isValid },
		handleSubmit,
		reset,
		control,
		clearErrors,
		// watch,
	} = useForm({ mode: 'all' });

	const [experienceId, typeId, projectId] = useCustomIds();

	const onFormSubmit = (data: object) => {
		// alert(JSON.stringify(data));

		console.log('data :>> ', data);
		reset();
		setIsСonditionsChecked(false);
		setIsDataChecked(false);
	};

	// ==========================Discord======================= //
	// видаляємо рендер помилки поля 'Discord'
	const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

	const onHandleDiscordChange: IDiscord = (fieldName, value) => {
		if (discordRegex.test(value)) {
			clearErrors(fieldName);
			setShouldDisplayMessage(true);
		} else {
			setShouldDisplayMessage(false);
		}
	};

	const onBlurDiscord = (event: { target: { value: string } }) => {
		const value = event.target.value;
		// console.log("value", value);
		if (value && discordRegex.test(value)) {
			setShouldDisplayMessage(true);
		} else {
			setShouldDisplayMessage(false);
		}
	};
	// ==========================Discord======================= //

	// ===================== checkbox================= //
	const [isСonditionsChecked, setIsСonditionsChecked] = useState(false); // Додано стан для чекбокса
	const [isDataChecked, setIsDataChecked] = useState(false); // Додано стан для чекбокса

	const handleСonditionsCheckboxChange = () => {
		setIsСonditionsChecked(!isСonditionsChecked);
	};
	const handleDataCheckboxChange = () => {
		setIsDataChecked(!isDataChecked);
	};
	// ===================== checkbox================= //

	// const isFormValid = watch();
	return (
		<div css={formWrapperStyle}>
			{' '}
			<form css={formStyle} onSubmit={handleSubmit(onFormSubmit)}>
				<h1 css={formTitle}>Анкета</h1>
				<FormField
					autoComplete="on"
					label="Ім'я *"
					type="text"
					placeholder="Ім'я"
					register={register}
					name="name"
					errors={errors?.name}
					inputProps={{
						required: requiredField,
						minLength: {
							value: 3,
							message: 'minimum length 3 characters',
						},
						maxLength: {
							value: 16,
							message: 'maximum length 16 characters',
						},
					}}
					onChange={(name: string, value: string) => handleNameChange(name, value, clearErrors)}
				/>
				<FormField
					autoComplete="off"
					label="Прізвище *"
					type="text"
					placeholder="Прізвище"
					register={register}
					name="surname"
					errors={errors?.surname}
					inputProps={{
						required: requiredField,
						minLength: {
							value: 5,
							message: 'minimum length 5 characters',
						},
						maxLength: {
							value: 16,
							message: 'maximum length 16 characters',
						},
					}}
					onChange={(name: string, value: string) => handleSurnameChange(name, value, clearErrors)}
				/>
				<FormField
					autoComplete="off"
					label="Спеціалізація (стек) *"
					type="text"
					placeholder="Спеціалізація (стек)"
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
							value: 17,
							message: 'maximum length 300 characters',
						},
					}}
					onChange={(name: string, value: string) => onHandleStackChange(name, value, clearErrors)}
				/>
				<FormField
					autoComplete="on"
					label="Телефон *"
					type="tel"
					placeholder="+XXXXXXXXXXXX"
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
					onChange={(name: string, value: string) => onHandlePhoneChange(name, value, clearErrors)}
				/>
				<FormField
					autoComplete="on"
					label="Електронна пошта *"
					type="email"
					placeholder="ххх@xxx.xxx"
					register={register}
					name="email"
					errors={errors?.email}
					inputProps={{
						required: requiredField,
						pattern: {
							message: 'Please enter valid email!',
							value: emailRegex,
						},
					}}
					onChange={(name: string, value: string) => onHandleEmailChange(name, value, clearErrors)}
				/>
				<div>
					<FormField
						onBlur={onBlurDiscord}
						autoComplete="off"
						label="Акаунт в Discord *"
						type="text"
						placeholder="xxx#1111"
						register={register}
						name="discord"
						errors={errors?.discord}
						inputProps={{
							required: requiredField,
							pattern: {
								message: 'Please enter valid discord name!',
								value: discordRegex,
							},
						}}
						onChange={(name: string, value: string) => onHandleDiscordChange(name, value)}
					/>
					{shouldDisplayMessage && (
						<span css={{ color: '#14905D', fontSize: '12px' }}>Не забудь перевірити запрошення</span>
					)}
				</div>

				<FormField
					autoComplete="off"
					label="Акаунт в LinkedIn *"
					type="text"
					placeholder="linkedin.com/in/"
					register={register}
					name="linkedin"
					errors={errors?.linkedin}
					inputProps={{
						required: requiredField,
						pattern: {
							message: 'Please enter valid link on your profile!',
							value: linkedRegex,
						},
					}}
					onChange={(name: string, value: string) => onHandleLinkedChange(name, value, clearErrors)}
				/>
				<FormField
					autoComplete="off"
					label="Місто (Країна)"
					type="text"
					placeholder="Місто"
					register={register}
					name="city"
					errors={errors?.city}
					inputProps={{
						minLength: {
							value: 1,
							message: 'minimum length 1 characters',
						},
						maxLength: {
							value: 22,
							message: 'maximum length 22 characters',
						},
					}}
					onChange={(name: string, value: string) => onHandleCityChange(name, value, clearErrors)}
				/>
				<CustomSelect
					title={'Наявність досвіду  *'}
					control={control}
					name="experience"
					rules={{ required: "Це поле обов'язкове" }}
					options={experience}
					placeholder="Наявність досвіду"
					clearErrors={clearErrors}
					valueGetter={(value) => getExpValue(value)}
				/>
				<CustomSelect
					title={'Тип участі *'}
					control={control}
					name="type"
					rules={{ required: "Це поле обов'язкове" }}
					options={type}
					placeholder="Тип участі"
					clearErrors={clearErrors}
					valueGetter={(value) => getTypeValue(value)}
				/>
				<CustomSelect
					title={'Проєкт на вибір *'}
					control={control}
					name="projects"
					rules={{ required: "Це поле обов'язкове" }}
					options={projects}
					placeholder="Проєкт"
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
