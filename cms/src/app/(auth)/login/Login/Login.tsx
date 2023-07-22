/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';
import { btnText, formTitle, inputPlaceholderText, labelsTitle } from '../../consts';
import { FormElement } from './FormElement/FormElement';
import { Button } from '~/src/app/components/Button/Button';
import { FormCss, TitleCss } from './Login.styles';
import Link from 'next/link';
import { CheckboxComponent } from './CheckboxComponent/CheckboxComponent';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';

export function LoginForm() {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const registers = {
		title: register('login', {
			required: 'You have not entered anything',
			minLength: {
				value: 8,
				message: 'You login is too short',
			},
			maxLength: {
				value: 12,
				message: 'You login is too long',
			},
			pattern: {
				value: /^[a-zA-Zа-яА-ЯіїІЇ].*$/,
				message: 'Неправильний логін',
			},
		}),
		name: register('password', {
			required: {
				value: true,
				message: 'You have not entered anything',
			},
			minLength: {
				value: 8,
				message: 'You password is too short',
			},
			maxLength: {
				value: 12,
				message: 'You password is too long',
			},

			pattern: {
				value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
				message: 'Неправильний пароль',
			},
		}),
	};

	const onClick = () => {
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onClick)} css={FormCss}>
			<h1 css={TitleCss}>{formTitle.login}</h1>

			<FormElement
				label={labelsTitle.login}
				inputPlaceholder={inputPlaceholderText.login}
				nameInput="login"
				inputType="text"
				register={registers.title}
				error={errors}
			/>
			<FormElement
				label={labelsTitle.password}
				inputPlaceholder={inputPlaceholderText.password}
				nameInput="password"
				inputType="password"
				register={registers.name}
				error={errors}
			/>
			<CheckboxComponent />
			<ForgotPassword />
			<Button btnType="submit">{btnText.login}</Button>
		</form>
	);
}
