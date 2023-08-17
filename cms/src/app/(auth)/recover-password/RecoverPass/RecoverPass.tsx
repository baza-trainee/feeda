'use client';
/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';

import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../../consts';
import { BlockCss, HeaderCss, InputCss, RecoverFormCss, SubtitleCss } from './RecoverPass.styles';

export function RecoverForm() {
	const { control, clearErrors, getValues } = useForm();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(getValues());
	};

	return (
		<form onSubmit={handleSubmit} css={RecoverFormCss}>
			<div css={BlockCss}>
				<header css={HeaderCss}>
					<Title title={formTitle['recover-password']} main />
					<p css={SubtitleCss}>
						Для відновлення паролю введіть Вашу електронну адресу. Вам надійде лист із посиланням для зміни паролю
					</p>
				</header>
				<div css={InputCss}>
					<Input
						placeholder={inputPlaceholderText.mail}
						type="text"
						name="login"
						id="login"
						control={control}
						clearErrors={clearErrors}
						label={labelsTitle.mail}
						pattern={patternsCheck.login.source}
						minLength={6}
						maxLength={70}
					/>
				</div>
			</div>
			<Button btnType="submit" title={btnText.login} variant="primary"></Button>
		</form>
	);
}
