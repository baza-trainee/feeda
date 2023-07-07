import React, { ChangeEvent, useState } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { discordRegex, discordSecondRegex } from '~components/UserApplication/helpers';

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
}

export const FormField = <TFormValues extends Record<string, string | number>>({
	label,
	type,
	placeholder,
	register,
	name,
	errors,
	inputProps,
	onChange,
	autoComplete,
}: FormFieldProps<TFormValues>) => {
	const errorMessage = errors?.message || 'Error!';

	const hasError = !!errors;

	const isDiscordField = name === 'discord';

	const [isDiscordValid, setIsDiscordValid] = useState(false);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.trim();
		const isValidtoDiscord = discordRegex.test(value) || (discordSecondRegex.test(value) && value.length >= 2);
		if (isValidtoDiscord) setIsDiscordValid(true);
		if (onChange) {
			onChange(name, value);
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
						isDiscordValid && !hasError && isDiscordField && validDiscordStyle,
					]}
					type={type}
					placeholder={placeholder}
					{...register(name, inputProps)}
					onChange={handleInputChange}
					autoComplete={autoComplete}
				/>
			</label>

			<div css={errorStyles}>{errors && `${errorMessage}`}</div>
		</div>
	);
};
