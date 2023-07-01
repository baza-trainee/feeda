import React, { ChangeEvent } from 'react';
import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface InputValidationOptions {
	value: number | string | RegExp;
	message: string;
}

interface FormFieldProps<TFormValues extends FieldValues> {
	label: string;
	type: string;
	placeholder: string;
	register: UseFormRegister<TFormValues>;
	name: Path<TFormValues>;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	inputProps?: Record<string, string | number | InputValidationOptions>;
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

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(name, event.target.value);
		}
	};

	return (
		<>
			<label>
				{label}
				<input
					type={type}
					placeholder={placeholder}
					{...register(name, inputProps)}
					onChange={handleInputChange}
					autoComplete={autoComplete}
				/>
			</label>
			<div>{errors && <p>{errorMessage}</p>}</div>
		</>
	);
};

export default FormField;
