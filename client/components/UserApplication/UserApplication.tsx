'use client';
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { theme } from 'styles/theme';

import Title from '~components/Button/Button';

import { discordRegex, emailRegex, linkedRegex, phoneNumberFormat, phoneNumberRegex } from './helpers';
import { getExpValue, getProjValue, getTypeValue } from './helpers';
import {
	handleNameChange,
	handleSurnameChange,
	onHandleCityChange,
	onHandleEmailChange,
	onHandleLinkedChange,
	onHandlePhoneChange,
	onHandleStackChange,
} from './helpers/handleChange';
import { experience, projects, type } from './lists';
import { formStyle, formTitle, formWrapperStyle } from './UserApplication.styles';
import CustomCheckbox from './сomponents/Checkbox/Checkbox';
// import { CheckboxField, CustomCheckbox } from './сomponents/Checkbox/Checkbox';
import FormField from './сomponents/FormField/FormField';
import { labelStyles } from './сomponents/FormField/FormField.slyles';

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

	// const [surname, setSurname] = useState("");

	const onFormSubmit = (data: object) => {
		// alert(JSON.stringify(data));

		console.log('data :>> ', data);
		reset();
		// setIsCheckedFirst(false);
		// setIsCheckedSecond(false);
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
			<h1 css={formTitle}>Анкета</h1>
			<form css={formStyle} onSubmit={handleSubmit(onFormSubmit)}>
				<FormField
					autoComplete="on"
					label="Ім'я *"
					type="text"
					placeholder="Ім'я"
					register={register}
					name="name"
					errors={errors?.name}
					inputProps={{
						required: 'name field is required',
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
						required: 'surname field is required',
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
						required: 'Enter at least one technology',
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
					placeholder="+38 **********"
					register={register}
					name="tel"
					errors={errors?.tel}
					inputProps={{
						required: 'Phone number field is required',
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
						required: 'email field is required',
						pattern: {
							message: 'Please enter valid email!',
							value: emailRegex,
						},
					}}
					onChange={(name: string, value: string) => onHandleEmailChange(name, value, clearErrors)}
				/>
				<>
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
							required: 'Discord field is required',
							pattern: {
								message: 'Please enter valid discord name!',
								value: discordRegex,
							},
						}}
						onChange={(name: string, value: string) => onHandleDiscordChange(name, value)}
					/>
					{shouldDisplayMessage && (
						<div>
							<span css={{ color: '#14905D;' }}>Не забудь перевірити запрошення</span>
						</div>
					)}
				</>
				<FormField
					autoComplete="off"
					label="Акаунт в LinkedIn *"
					type="text"
					placeholder="linkedin.com/in/"
					register={register}
					name="linkedin"
					errors={errors?.linkedin}
					inputProps={{
						required: 'LinkedIn field is required',
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
				<Controller
					control={control}
					name="experience"
					rules={{ required: 'Please choose one of the options' }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('experience'); // Викликаємо clearErrors для поля "projects"
						};
						return (
							<>
								<label css={labelStyles}>
									Наявність досвіду *
									<Select
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
								{error && <span style={{ color: 'red', display: 'block' }}>{error.message}</span>}
							</>
						);
					}}
				/>
				<Controller
					control={control}
					name="projects"
					rules={{ required: 'Будь ласка виберіть проєкт!' }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('projects'); // Викликаємо clearErrors для поля "projects"
						};
						return (
							<>
								<label css={labelStyles}>
									Проєкт на вибір *
									<Select
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
								{error && <span style={{ color: 'red', display: 'block' }}>{error.message}</span>}
							</>
						);
					}}
				/>
				<Controller
					control={control}
					name="type"
					rules={{ required: 'Виберіть одну з опцій' }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('type'); // Викликаємо clearErrors для поля "projects"
						};
						return (
							<>
								<label css={labelStyles}>
									Тип участі *
									<Select
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
								{error && <span style={{ color: 'red', display: 'block' }}>{error.message}</span>}
							</>
						);
					}}
				/>
				{/* 
				<Controller
					control={control}
					name="project"
					rules={{ required: 'Please choose a project' }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('projects'); // Викликаємо clearErrors для поля "projects"
						};

						return (
							<>
								<label css={labelStyles}>
									Проєкт на вибір *
									<Select
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
								{error && <span style={{ color: 'red', display: 'block' }}>{error.message}</span>}
							</>
						);
					}}
				/>

				<Controller
					control={control}
					name="type"
					rules={{ required: 'Please choose one of the options' }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('type'); // Викликаємо clearErrors для поля "projects"
						};

						return (
							<>
								<label css={labelStyles}>
									Тип участі *
									<Select
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
								{error && <span style={{ color: 'red' }}>{error.message}</span>}
							</>
						);
					}}
				/> */}
				{/* <CheckboxField
					name="conditions"
					label="Ознайомлений/на з "
					linkText="умовами участі в проєкті *"
					isChecked={isCheckedFirst}
					onChange={handleFirstCheckboxChange}
				/>

				<CheckboxField
					name="processing"
					label="Погоджуюсь з"
					linkText="обробкою персональних даних *"
					isChecked={isCheckedSecond}
					onChange={handleSecondCheckboxChange}
				/> */}
				{/* <CheckboxField name="nemsss" title="Ознайомлений/на з умовами участі в проєкті *" id="sdfsdfsdf" />
				<CheckboxField name="nemsss" title="Погоджуюсь з обробкою персональних даних *" id="sdfsdfsssdf" /> */}
				<CustomCheckbox
					label="Ознайомлений/на з "
					linkText="умовами участі в проєкті *"
					isChecked={isСonditionsChecked}
					onCheckboxChange={handleСonditionsCheckboxChange}
				/>
				<CustomCheckbox
					label="Погоджуюсь з "
					linkText="обробкою персональних даних *"
					isChecked={isDataChecked}
					onCheckboxChange={handleDataCheckboxChange}
				/>

				<Title isDisabled={!isСonditionsChecked || !isValid || !isDataChecked} func={handleSubmit(onFormSubmit)}>
					Відправити анкету
				</Title>
				{/* <div>
				<button type="submit" disabled={!isCheckedFirst || !isCheckedSecond || !isValid}>
					Відправити анкету
				</button>
			</div> */}
			</form>
		</div>
	);
};

export default UserApplication;
