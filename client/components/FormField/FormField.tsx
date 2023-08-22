import React from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { discordRegex } from '~components/UserApplication/helpers';

/** @jsxImportSource @emotion/react */
import {
	errorInputStyles,
	errorStyles,
	inputlStyles,
	labelStyles,
	validation,
	validDiscordNameStyle,
	validDiscordStyle,
	validDiscordUnderText,
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
	discordValue,
}: FormFieldProps<TFormValues>) => {
	const errorMessage = <>{errors?.message || 'Error!'}</>;

	const hasError = !!errors;

	const isValid = !errors;

	const isDiscordField = name === 'discord';

	const isValidDiscordValue = discordValue && discordValue.length >= 2 && discordRegex.test(discordValue);

	return (
		<div style={{ position: 'relative' }}>
			<label css={labelStyles}>
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
					onBlur={(e) => {
						const trimmedValue = e.target.value.trim();
						e.target.value = trimmedValue;
						register(name).onBlur(e);
					}}
				/>
				<p data-category="label-text" css={isValid && isDiscordField && isValidDiscordValue && validDiscordNameStyle}>
					{label}
				</p>
				{isValid && isDiscordField && isValidDiscordValue && (
					<p data-category="noerrors" css={[validation, validDiscordUnderText]}>
						Не забудь перевірити запрошення
					</p>
				)}
				{!isValid && <p css={[validation, errorStyles]}>{errorMessage}</p>}
			</label>
		</div>
	);
};
