import React, { ChangeEvent, ReactNode, useState } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { discordRegex } from '~components/UserApplication/helpers';

/** @jsxImportSource @emotion/react */
import { errorInputStyles, errorStyles, inputlStyles, labelStyles, validDiscordStyle } from './FormField.slyles';

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
}

// export const FormField = <TFormValues extends Record<string, string | number>>({
// 	label,
// 	type,
// 	placeholder,
// 	register,
// 	name,
// 	errors,
// 	inputProps,
// 	autoComplete,
// 	children,
// }: // children,
// FormFieldProps<TFormValues>) => {
// 	const errorMessage = <>{errors?.message || 'Error!'}</>;

// 	const hasError = !!errors;
// 	const [isFocused, setIsFocused] = useState(false);
// 	const isValid = !errors;
// 	const handleFocus = () => {
// 		setIsFocused(true);
// 	};

// 	// const handleBlur = () => {
// 	// 	setIsFocused(false);
// 	// };

// 	// const handleBlur = () => {
// 	// 	setIsFocused(true);
// 	// };

// 	// const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
// 	// 	const value = event.target.value.trim();
// 	// 	const isValidtoDiscord = discordRegex.test(value) && value.length >= 2;
// 	// 	if (isValidtoDiscord) setIsDiscordValid(true);
// 	// 	if (onChange) {
// 	// 		onChange(name, value);
// 	// 	}
// 	// };

// 	return (
// 		<div style={{ height: 'auto' }}>
// 			<label css={labelStyles}>
// 				<p>{label}</p>
// 				<input
// 					css={[inputlStyles, hasError && errorInputStyles, isValid && validDiscordStyle]}
// 					type={type}
// 					placeholder={placeholder}
// 					{...register(name, inputProps)}
// 					autoComplete={autoComplete}
// 					// onBlur={handleBlur}
// 					onFocus={handleFocus}
// 				/>
// 			</label>
// 			{isFocused && children}
// 			{errors && <div css={errorStyles}>{errorMessage}</div>}
// 		</div>
// 	);
// };
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
}: FormFieldProps<TFormValues>) => {
	const errorMessage = <>{errors?.message || 'Error!'}</>;

	const hasError = !!errors;

	const [isValidDiscord, setIsValidDiscord] = useState(false);

	const isValid = !errors;

	const isDiscordField = name === 'discord';

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim();
		console.log('value :>> ', value);
		if (isDiscordField && discordRegex.test(value)) {
			setIsValidDiscord(true);
		}
	};

	return (
		<div style={{ height: 'auto' }}>
			<label css={labelStyles}>
				<p>{label}</p>
				<input
					css={[
						inputlStyles,
						hasError && errorInputStyles,
						isValid && isDiscordField && isValidDiscord && validDiscordStyle,
					]}
					type={type}
					placeholder={placeholder}
					{...register(name, inputProps)}
					autoComplete={autoComplete}
					// onFocus={handleFocus}
					// onBlur={handleInputChange}
					onChange={handleInputChange}
				/>
			</label>
			{children}
			{errors && <div css={errorStyles}>{errorMessage}</div>}
		</div>
	);
};
