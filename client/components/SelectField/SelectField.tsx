/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';

import { DropdownIndicator } from '../DropdownIndicator/DropdownIndicator';
import { Label, selectStyles } from './SelectField.styles';
import { ErrorText } from './SelectField.styles';

interface OptionType {
	label: string;
	value: string;
}

interface CustomSelectProps {
	control: Control;
	name: string;
	rules?: object;
	options: OptionType[];
	placeholder: string;
	clearErrors: (name?: string | string[]) => void;
	valueGetter: (value: string) => OptionType | undefined | string;
	title: string;
}

export const CustomSelect = ({
	control,
	name,
	rules,
	options,
	placeholder,
	clearErrors,
	valueGetter,
	title,
}: CustomSelectProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
				const handleSelectChange = () => {
					clearErrors(name);
				};

				const computedValue = typeof valueGetter === 'function' ? valueGetter(value) : value;

				return (
					<div style={{ position: 'relative' }}>
						<Label>
							{title}
							<Select
								components={{ DropdownIndicator }}
								instanceId={name}
								isSearchable={false}
								styles={selectStyles(!!error, isDropdownOpen)}
								placeholder={placeholder}
								options={options}
								value={computedValue}
								onChange={(selectedOption) => {
									setIsDropdownOpen(false);
									onChange(selectedOption);
									handleSelectChange();
								}}
								onMenuOpen={() => setIsDropdownOpen(true)}
								onMenuClose={() => setIsDropdownOpen(false)}
								onBlur={() => {
									setIsDropdownOpen(false);

									onBlur();
								}}
							/>
						</Label>
						{error && <ErrorText>{error.message}</ErrorText>}
					</div>
				);
			}}
		/>
	);
};
