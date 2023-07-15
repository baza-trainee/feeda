import React, { ChangeEvent, useState } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { discordRegex } from '~components/UserApplication/helpers';

/** @jsxImportSource @emotion/react */
import {
	errorInputStyles,
	errorStyles,
	inputlStyles,
	labelStyles,
	vaidDiscordUnderText,
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
	isFormSubmitted?: boolean;
	discordValue?: string;
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
	// isFormSubmitted,
	discordValue,
}: FormFieldProps<TFormValues>) => {
	const errorMessage = <>{errors?.message || 'Error!'}</>;

	const hasError = !!errors;

	// const [isValidDiscord, setIsValidDiscord] = useState(false);

	const isValid = !errors;

	const isDiscordField = name === 'discord';

	const isValidDiscordValue = discordValue && discordValue.length >= 2 && discordRegex.test(discordValue);

	console.log(isValidDiscordValue);
	console.log(discordValue);
	// const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
	// 	const value = event.target.value.trim();
	// 	console.log('value :>> ', value);
	// 	if (isDiscordField && discordRegex.test(value) && value.length >= 2) {
	// 		setIsValidDiscord(true);
	// 	} else {
	// 		setIsValidDiscord(false);
	// 	}
	// };

	return (
		<div style={{ position: 'relative' }}>
			<label css={[labelStyles]}>
				{/* <p css={isValid && isDiscordField && isValidDiscord && !isFormSubmitted && validDiscordNameStyle}>{label}</p> */}
				<p css={isValid && isDiscordField && isValidDiscordValue && validDiscordNameStyle}>{label}</p>
				<input
					css={[
						inputlStyles,

						hasError && errorInputStyles,
						isValid && isDiscordField && isValidDiscordValue && validDiscordStyle,
					]}
					type={type}
					placeholder={placeholder}
					{...register(name, inputProps)}
					autoComplete={autoComplete}
					// onBlur={handleInputChange}
				/>
			</label>
			{!isValid && <p css={errorStyles}>{errorMessage}</p>}
			{isValid && isDiscordField && isValidDiscordValue && (
				<p css={vaidDiscordUnderText}>Не забудь перевірити запрошення</p>
			)}
		</div>
	);
};
