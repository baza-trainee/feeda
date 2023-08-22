import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGlobalState } from '~/hooks/useGlobalState';
import Button from '~components/Button/Button';
import Title from '~components/Title/Title';

import { CheckBox } from '../Checkbox/Checkbox';
import { FormField } from '../FormField/FormField';
import { CustomSelect } from '../SelectField/SelectField';
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
import { CheckWrapper, Form, FormWrapper, InputsWrapper, SelectWrapper } from './UserApplication.styles';

export const UserApplication = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
		control,
		clearErrors,
		watch,
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
	});

	const [isActivationButton, setIsActivationButton] = useState(false);
	const [isTermsChecked, setIsTermsChecked] = useState(false);
	const [isAgreementChecked, setIsAgreementChecked] = useState(false);
	const { setState } = useGlobalState();

	const nameValue = watch('name');
	const lastnameValue = watch('lastname');
	const stackValue = watch('stack');
	const phoneValue = watch('tel');
	const emailValue = watch('email');
	const linkedInvalue = watch('linkedin');
	const discordValue = watch('discord');

	const handleTermsCheckboxChange = () => setIsTermsChecked(!isTermsChecked);

	const handleAgreementCheckboxChange = () => setIsAgreementChecked(!isAgreementChecked);

	useEffect(() => {
		if (discordValue && nameValue && lastnameValue && stackValue && phoneValue && emailValue && linkedInvalue)
			setIsActivationButton(true);
		else setIsActivationButton(false);
	}, [discordValue, nameValue, lastnameValue, stackValue, phoneValue, emailValue, linkedInvalue]);

	const onFormSubmit = (data: object) => {
		console.log('data :>> ', data);
		setState((prev) => ({ ...prev, location: 'finish' }));
		setTimeout(() => {
			reset();
		}, 0);
	};

	return (
		<FormWrapper
			key="application"
			style={{ opacity: 0, translateY: '-100vh' }}
			animate={{ opacity: 1, translateY: '0' }}
			transition={{ duration: 1 }}
		>
			<Form key="application" onSubmit={handleSubmit(onFormSubmit)}>
				<Title main application>
					Анкета
				</Title>
				<InputsWrapper>
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
								message: "будь ласка введіть валіднe ім'я",
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
							pattern: {
								value: nameRegex,
								message: 'будь ласка введіть валіднe прізвище',
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
								message: `введіть номер у форматі: ${phoneNumberFormat}`,
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
						discordValue={discordValue}
					/>

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
								message: 'будь ласка введіть валідну назву міста(країни)',
								value: cityRegex,
							},
						}}
					/>
				</InputsWrapper>
				<SelectWrapper>
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
				</SelectWrapper>

				<CheckWrapper>
					<CheckBox
						name="terms"
						labeltxt="Ознайомлений/на з "
						linkText="умовами участі в проєкті *"
						onChange={() => handleTermsCheckboxChange()}
					/>
					<CheckBox
						name="agreement"
						labeltxt="Погоджуюсь з "
						linkText="обробкою персональних даних *"
						onChange={() => handleAgreementCheckboxChange()}
					/>
				</CheckWrapper>
				<Button
					isDisabled={Object.keys(errors).length > 0 || !isActivationButton || !isTermsChecked || !isAgreementChecked}
					func={handleSubmit(onFormSubmit)}
				>
					Відправити анкету
				</Button>
			</Form>
		</FormWrapper>
	);
};
