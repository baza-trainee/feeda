import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select, { components } from 'react-select';

import Image from 'next/image';
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

const DropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
	return (
		<components.DropdownIndicator {...props}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M5.94451 9.20954C6.16016 8.95794 6.53894 8.9288 6.79053 9.14446L12.0001 13.6098L17.2096 9.14446C17.4612 8.9288 17.84 8.95794 18.0556 9.20954C18.2713 9.46113 18.2421 9.83991 17.9905 10.0556L12.3905 14.8556C12.1658 15.0482 11.8343 15.0482 11.6096 14.8556L6.00958 10.0556C5.75799 9.83991 5.72885 9.46113 5.94451 9.20954Z"
					fill="currentColor"
				/>
			</svg>
		</components.DropdownIndicator>
	);
};
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
								components={{ DropdownIndicator }}
								instanceId={name}
								isSearchable={false}
								styles={{
									control: (provided, { menuIsOpen }) => ({
										...provided,
										border: `1px solid ${
											error ? 'red' : menuIsOpen ? '#939393 !important' : theme.colors.disabledBtnBg
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

										color: '#939393',
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
