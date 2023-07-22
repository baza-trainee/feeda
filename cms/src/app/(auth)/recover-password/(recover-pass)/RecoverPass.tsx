'use client';
/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';
import { btnText, formTitle, inputPlaceholderText, labelsTitle } from '../../consts';
import { FormElement } from '../../login/Login/FormElement/FormElement';
import { Button } from '~/src/app/components/Button/Button';
import { HeaderCss, RecoverFormCss, SubtitleCss, TitleCss } from './RecoverPass.styles';

export function RecoverForm() {
	const {
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		reValidateMode: 'onChange',
	});

	const onClick = () => {
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onClick)} css={RecoverFormCss}>
			<header css={HeaderCss}>
				<h1 css={TitleCss}>{formTitle['recover-password']}</h1>
				<p css={SubtitleCss}>
					Для відновлення паролю введіть Вашу електронну адресу. Вам надійде лист із посиланням для зміни паролю
				</p>
			</header>

			<FormElement
				label={labelsTitle.mail}
				inputPlaceholder={inputPlaceholderText.mail}
				nameInput="mail"
				inputType="email"
				error={errors}
			/>

			<Button btnType="submit">{btnText.send}</Button>
		</form>
	);
}
