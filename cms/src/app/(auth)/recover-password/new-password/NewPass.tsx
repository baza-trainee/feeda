'use client';
/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';
import { btnText, formTitle, inputPlaceholderText, labelsTitle } from '../../consts';
import { FormElement } from '../../login/Login/FormElement/FormElement';
import { Button } from '~/src/app/components/Button/Button';
import { CheckboxComponent } from '../../login/Login/CheckboxComponent/CheckboxComponent';
import { NewPassFormCss, NewPassTitleCss } from './NewPass.styles';

export function NewPassForm() {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
	});

	const onClick = () => {
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onClick)} css={NewPassFormCss}>
			<h1 css={NewPassTitleCss}>{formTitle['recover-password']}</h1>

			<FormElement
				label={labelsTitle['new-password']}
				inputPlaceholder={inputPlaceholderText.password}
				nameInput="new password"
				inputType="password"
				error={errors}
			/>

			<FormElement
				label={labelsTitle['repeat-new-password']}
				inputPlaceholder={inputPlaceholderText.password}
				nameInput="repeat new password"
				inputType="password"
				error={errors}
			/>
			<CheckboxComponent />
			<Button btnType="submit">{btnText.login}</Button>
		</form>
	);
}
