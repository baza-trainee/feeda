'use client';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

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
import CheckboxField from './сomponents/Checkbox/Checkbox';
import FormField from './сomponents/FormField/FormField';

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

	const onFormSubmit = (data) => {
		// alert(JSON.stringify(data));
		console.log('data :>> ', data);
		reset();
		setIsCheckedFirst(false);
		setIsCheckedSecond(false);
	};

	// ==========================Discord======================= //
	// видаляємо рендер помилки поля 'Discord'
	const [shouldDisplayMessage, setShouldDisplayMessage] = useState(false);

	const onHandleDiscordChange = (fieldName, value) => {
		if (discordRegex.test(value)) {
			clearErrors(fieldName);
			setShouldDisplayMessage(true);
		} else {
			setShouldDisplayMessage(false);
		}
	};

	const onBlurDiscord = (event) => {
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
	const [isCheckedFirst, setIsCheckedFirst] = useState(false);
	const [isCheckedSecond, setIsCheckedSecond] = useState(false);

	const handleFirstCheckboxChange = (isChecked) => {
		// console.log("event", event);
		setIsCheckedFirst(isChecked);
	};
	const handleSecondCheckboxChange = (isChecked) => {
		// console.log("event", event);
		setIsCheckedSecond(isChecked);
	};
	// ===================== checkbox================= //

	// const isFormValid = watch();
	return (
		<>
			<h1>Подати заявку</h1>
			<form onSubmit={handleSubmit(onFormSubmit)}>
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
					onChange={(name, value) => handleNameChange(name, value, clearErrors)}
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
					onChange={(name, value) => handleSurnameChange(name, value, clearErrors)}
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
					onChange={(name, value) => onHandleStackChange(name, value, clearErrors)}
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
					onChange={(name, value) => onHandlePhoneChange(name, value, clearErrors)}
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
					onChange={(name, value) => onHandleEmailChange(name, value, clearErrors)}
				/>

				<>
					<FormField
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
							onBlur: onBlurDiscord,
						}}
						onChange={(name, value) => onHandleDiscordChange(name, value, clearErrors)}
					/>
					{shouldDisplayMessage && (
						<div>
							<span>Не забудь перевірити запрошення</span>
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
					onChange={(name, value) => onHandleLinkedChange(name, value, clearErrors)}
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
					onChange={(name, value) => onHandleCityChange(name, value, clearErrors)}
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
								<label>
									Наявність досвіду *
									<Select
										placeholder="Так / Ні"
										options={experience}
										value={getExpValue(value)}
										onChange={(value) => {
											onChange(value.value);
											handleSelectChange(value);
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
					name="project"
					rules={{ required: 'Please choose a project' }}
					render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
						const handleSelectChange = () => {
							clearErrors('projects'); // Викликаємо clearErrors для поля "projects"
						};
						const inputId = 'project-select';
						console.log('inputId', inputId);
						return (
							<>
								<label>
									Проєкт на вибір *
									<Select
										id={inputId}
										placeholder="Проєкт"
										options={projects}
										value={getProjValue(value)}
										onChange={(value) => {
											onChange(value.value);
											handleSelectChange(value);
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
						const handleSelectChange = (value) => {
							clearErrors('type'); // Викликаємо clearErrors для поля "projects"
						};

						return (
							<>
								<label>
									Тип участі *
									<Select
										placeholder="Тип участі"
										options={type}
										value={getTypeValue(value)}
										onChange={(value) => {
											onChange(value.value);
											handleSelectChange(value);
										}}
										onBlur={() => onBlur()}
									/>
								</label>
								{error && <span style={{ color: 'red' }}>{error.message}</span>}
							</>
						);
					}}
				/>
				<CheckboxField
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
				/>

				<div>
					<button type="submit" disabled={!isCheckedFirst || !isCheckedSecond || !isValid}>
						Відправити анкету
					</button>
				</div>
			</form>
		</>
	);
};

export default UserApplication;
