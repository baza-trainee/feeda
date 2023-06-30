import React from 'react';
import { DeepMap, FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
//
interface FormFieldTypes<TFormValues extends FieldValues> {
	label: string;
	type: string;
	placeholder: string;
	register: UseFormRegister<TFormValues>;
	name: string;
	errors?: Partial<DeepMap<TFormValues, FieldError>>;
	onChange?: () => void;
	autoComplete: string;
}

const FormField = <TFormValues extends Record<string, any>>({
	label,
	type,
	placeholder,
	register,
	name,
	errors,
	inputProps,
	onChange,
	autoComplete,
}: FormFieldTypes<TFormValues>) => {
	const errorMessage = errors?.message || 'Error!';

	const handleInputChange = (event: Event) => {
		onChange(name, event?.target?.value);
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
