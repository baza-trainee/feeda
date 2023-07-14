import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';

/** @jsxImportSource @emotion/react */
import { theme } from 'styles/theme';

import { labelStyles } from '../FormField/FormField.slyles';
import { errorTextStyles } from './SelectField.styles';

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

export const CustomSelect: React.FC<CustomSelectProps> = ({
	control,
	name,
	rules,
	options,
	placeholder,
	clearErrors,
	valueGetter,
	title,
}) => {
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
					<div>
						<label css={labelStyles}>
							{title}
							<Select
								instanceId={name}
								isSearchable={false}
								styles={{
									control: (provided, { menuIsOpen }) => ({
										...provided,
										border: `1px solid ${
											error ? 'red' : menuIsOpen ? '#49454F!important ' : theme.colors.disabledBtnBg
										}`,
										boxShadow: 'none',

										borderRadius: '4px',
										padding: '16px',
										cursor: 'pointer',
										':hover': {
											borderColor: `${error ? 'red' : theme.colors.disabledBtnBg}`,
										},
									}),
									indicatorSeparator: () => ({
										display: 'none',
									}),
									valueContainer: (provided) => ({
										...provided,
										padding: 0,
										margin: 0,
									}),
									input: (provided) => ({
										...provided,
										margin: 0,
									}),
									dropdownIndicator: (provided) => ({
										...provided,
										padding: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',

										transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
									}),
									menu: (provided) => ({
										...provided,
										border: 'none',
										boxShadow: 'none',
										backgroundColor: '#FCFCFC',
										borderRadius: '4px',
										margin: '4px 0 0 0 ',
									}),
									option: (provided, state) => ({
										...provided,
										backgroundColor: state.isFocused ? '#FDF5DD' : '#FCFCFC',
										color: '#232323',
										borderRadius: '4px',
										height: '56px',
										display: 'flex',
										alignItems: 'center',
										padding: '0 16px',
										':active': {
											color: '#FCFCFC',
											backgroundColor: '#232323',
										},
									}),
								}}
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
						</label>
						{error && <span css={errorTextStyles}>{error.message}</span>}
					</div>
				);
			}}
		/>
	);
};
