import React, { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { useGlobalState } from '~/hooks/useGlobalState';
import Button from '~components/Button/Button';
import Title from '~components/Title/Title';

import { fetchProjects, fetchProjectTypes, sendApplication } from '../../api';
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
import { experience, projectsTemporary } from './lists';
import { CheckWrapper, Form, FormWrapper, InputsWrapper, SelectWrapper } from './UserApplication.styles';

interface pprojType {
	id?: string;
	value: string;
	label: string;
}

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

	const [projectTypes, setProjectTypes] = useState<pprojType[]>();
	const [projects, setProjects] = useState<pprojType[]>();
	const [isActivationButton, setIsActivationButton] = useState(false);
	const { state, setState } = useGlobalState();

	console.log('Project types:', projectTypes);
	console.log('Projects:', projects);

	const nameValue = watch('first_name');
	const lastnameValue = watch('last_name');
	const stackValue = watch('stack');
	const phoneValue = watch('phone_number');
	const emailValue = watch('email');
	const linkedInvalue = watch('account_linkedin');
	const discordValue = watch('account_discord');

	const fetchTypesOfProjectsAndParticipants = async () => {
		try {
			const projsTypes = [] as pprojType[];
			const projs = [] as pprojType[];
			const projTypes = (await fetchProjectTypes) as { project_type: string }[];
			const prjsList = (await fetchProjects) as { id: number; title: string }[];
			// console.log('prjsList', prjsList);

			projTypes &&
				projTypes.map((item, index: number) => {
					item.project_type && projsTypes.push({ value: `${index + 1}`, label: item.project_type });
				});
			setProjectTypes(projsTypes);

			prjsList && prjsList.map((item) => projs.push({ value: `${item.id}`, label: item.title }));

			setState((prev) => ({ ...prev, projects: prjsList }));
			setProjects(projs);
		} catch (error) {
			console.log('error', error);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		fetchTypesOfProjectsAndParticipants();
		return () => {
			controller.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (discordValue && nameValue && lastnameValue && stackValue && phoneValue && emailValue && linkedInvalue)
			setIsActivationButton(true);
		else setIsActivationButton(false);
	}, [discordValue, nameValue, lastnameValue, stackValue, phoneValue, emailValue, linkedInvalue]);

	const onFormSubmit: SubmitHandler<FieldValues> = (data) => {
		const {
			first_name,
			last_name,
			stack,
			phone_number,
			email,
			account_discord,
			account_linkedin,
			city,
			experience,
			type_participant,
			project,
		} = data;
		const processedData = {
			first_name,
			last_name,
			stack,
			phone_number,
			email,
			account_discord,
			account_linkedin,
			city,
			experience: experience.value === '1' ? true : experience.value === '0' && false,
			type_participant: Number(type_participant.value),
			project: [Number(project.value)],
			conditions_participation: state.approved?.terms,
			processing_personal_data: state.approved?.agreement,
		};
		// console.log('processedData', processedData);
		sendApplication(processedData);
		setState((prev) => ({ ...prev, location: 'finish' }));
		setTimeout(() => {
			reset();
		}, 0);
	};

	return projectTypes ? (
		<FormWrapper
			key="application"
			style={{ opacity: 0, translateY: '100px' }}
			animate={{ opacity: 1, translateY: '0' }}
			exit={{ opacity: 0, translateY: '-100px' }}
			transition={{ duration: 0.5 }}
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
						name="first_name"
						errors={errors?.name}
						inputProps={{
							required: requiredField,
							minLength: {
								value: 2,
								message: 'Поле повинно містити мінімум 2 символи',
							},
							maxLength: {
								value: 50,
								message: 'Поле повинно містити не більше 50 символів',
							},
							pattern: {
								value: nameRegex,
								message: "Будь ласка введіть валіднe ім'я",
							},
						}}
					/>

					<FormField
						label="Прізвище *"
						autoComplete="off"
						type="text"
						placeholder={lastnamePlaceholder}
						register={register}
						name="last_name"
						errors={errors?.lastname}
						inputProps={{
							required: requiredField,
							minLength: {
								value: 2,
								message: 'Поле повинно містити мінімум 2 символи',
							},
							maxLength: {
								value: 50,
								message: 'Поле повинно містити не більше 50 символів',
							},
							pattern: {
								value: nameRegex,
								message: 'Будь ласка введіть валіднe прізвище',
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
								message: 'Поле повинно містити мінімум 2 символи',
							},
							maxLength: {
								value: 300,
								message: 'Поле повинно містити не більше 300 символів',
							},
						}}
					/>

					<FormField
						label="Телефон *"
						autoComplete="on"
						type="tel"
						placeholder={phoneNumberFormat}
						register={register}
						name="phone_number"
						errors={errors?.tel}
						inputProps={{
							required: requiredField,
							pattern: {
								message: `Введіть номер у форматі: ${phoneNumberFormat}`,
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
						name="account_discord"
						errors={errors?.discord}
						inputProps={{
							required: requiredField,
							pattern: {
								message: "Введіть валідне ім'я користувача",
								value: discordRegex,
							},

							minLength: {
								value: 2,
								message: 'Поле повинно містити мінімум 2 символи',
							},
							maxLength: {
								value: 37,
								message: 'Поле повинно містити не більше 37 символів',
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
						name="account_linkedin"
						errors={errors?.linkedin}
						inputProps={{
							required: requiredField,
							pattern: {
								message: 'Будь ласка введіть правильну адресу',
								value: linkedRegex,
							},
							minLength: {
								value: 19,
								message: 'Поле повинно містити мінімум 19 символів',
							},
							maxLength: {
								value: 128,
								message: 'Поле повинно містити не більше 128 символів',
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
								message: 'Поле повинно містити мінімум 2 символи',
							},
							maxLength: {
								value: 50,
								message: 'Поле повинно містити не більше 50 символів',
							},
							pattern: {
								message: 'Будь ласка введіть валідну назву міста(країни)',
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
						valueGetter={(value: string) => value && experience.find((item) => item.label === value)}
					/>
					<CustomSelect
						title={'Тип участі *'}
						control={control}
						name="type_participant"
						rules={{ required: requiredField }}
						options={projectTypes}
						placeholder={typePlaceholder}
						clearErrors={clearErrors}
						valueGetter={(value: string) => value && projectTypes.find((item) => item.value === value)}
					/>
					<CustomSelect
						title={'Проєкт на вибір *'}
						control={control}
						name="project"
						rules={{ required: requiredField }}
						options={projects || projectsTemporary}
						placeholder={projectPlaceholder}
						clearErrors={clearErrors}
						valueGetter={(value: string) => value && projectsTemporary.find((item) => item.value === value)}
					/>
				</SelectWrapper>

				<CheckWrapper>
					<CheckBox name="terms" labeltxt="Ознайомлений/на з " linkText="умовами участі в проєкті *" />
					<CheckBox name="agreement" labeltxt="Погоджуюсь з " linkText="обробкою персональних даних *" />
				</CheckWrapper>
				<Button
					isDisabled={
						Object.keys(errors).length > 0 || !isActivationButton || !state.approved?.agreement || !state.approved.terms
					}
					func={handleSubmit(onFormSubmit)}
				>
					Відправити анкету
				</Button>
			</Form>
		</FormWrapper>
	) : (
		<></>
	);
};
