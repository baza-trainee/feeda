import React, { ChangeEvent } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

/** @jsxImportSource @emotion/react */
import { errorInputStyles, errorStyles, inputlStyles, labelStyles } from './FormField.slyles';

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
	placeholder: string;
	register: UseFormRegister<TFormValues>;
	name: Path<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	inputProps?: InputProps;
	onChange?: (name: string, value: string) => void;
	autoComplete: string;
	onBlur?: (event: { target: { value: string } }) => void;
}

const FormField = <TFormValues extends Record<string, string | number>>({
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
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(name, event.target.value);
		}
	};

	return (
		<div style={{ height: 'auto' }}>
			<label css={labelStyles}>
				<p>{label}</p>
				<input
					css={[inputlStyles, hasError && errorInputStyles]}
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

export default FormField;
