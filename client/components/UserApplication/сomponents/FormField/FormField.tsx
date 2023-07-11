import React, { ChangeEvent, ReactNode, useState } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { discordRegex } from '~components/UserApplication/helpers';

/** @jsxImportSource @emotion/react */
import {
	errorInputStyles,
	errorStyles,
	inputlStyles,
	labelStyles,
	validDiscordNameStyle,
	validDiscordStyle,
} from './FormField.slyles';

interface InputValidationOptions {
	value: number | string | RegExp;
	message: string;
}
interface InputProps {
	[key: string]: string | number | InputValidationOptions;
}

interface FormFieldProps<TFormValues extends FieldValues> {
	label: string;
	type: string;
	placeholder?: string;
	register: UseFormRegister<TFormValues>;
	name: Path<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	inputProps?: InputProps;
	onChange?: (name: string, value: string) => void;
	autoComplete: string;
	onBlur?: (event: { target: { value: string } }) => void;
	onFocus?: (event: { target: { value: string } }) => void;
	children?: ReactNode;
	isFormSubmitted?: boolean;
}

export const FormField = <TFormValues extends Record<string, string | number>>({
	label,
	type,
	placeholder,
	register,
	name,
	errors,
	inputProps,
	autoComplete,
	children,
	isFormSubmitted,
}: FormFieldProps<TFormValues>) => {
	const errorMessage = <>{errors?.message || 'Error!'}</>;

	const hasError = !!errors;

	const [isValidDiscord, setIsValidDiscord] = useState(false);

	const isValid = !errors;

	const isDiscordField = name === 'discord';

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim();
		console.log('value :>> ', value);
		if (isDiscordField && discordRegex.test(value) && value.length >= 2) {
			setIsValidDiscord(true);
		} else {
			setIsValidDiscord(false);
		}
	};

	return (
		<div style={{ height: 'auto' }}>
			<label css={[labelStyles]}>
				<p css={isValid && isDiscordField && isValidDiscord && !isFormSubmitted && validDiscordNameStyle}>{label}</p>
				<input
					css={[
						inputlStyles,

						hasError && errorInputStyles,
						isValid && isDiscordField && isValidDiscord && !isFormSubmitted && validDiscordStyle,
					]}
					type={type}
					placeholder={placeholder}
					{...register(name, inputProps)}
					autoComplete={autoComplete}
					// onFocus={handleFocus}

					onBlur={handleInputChange}
					// onChange={handleInputChange}
				/>
			</label>
			{children}
			{!isValid && <p css={errorStyles}>{errorMessage}</p>}
			{isValid && isDiscordField && isValidDiscord && !isFormSubmitted && <p>hello</p>}
		</div>
	);
};
