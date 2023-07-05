import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

import { theme } from 'styles/theme';

import { labelStyles } from '../FormField/FormField.slyles';
import { ErrorText } from './SelectField.styled';

export const SelectField = ({ control, name, rules, options, placeholder, clearErrors }) => {
	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
				const handleSelectChange = () => {
					clearErrors(name);
				};

				return (
					<div>
						<label css={labelStyles}>
							{placeholder}
							<Select
								instanceId={`${name}Id`}
								isSearchable={false}
								styles={{
									control: (provided) => ({
										...provided,
										border: `1px solid ${theme.colors.disabledBtnBg}`,
										boxShadow: 'none',
										borderRadius: '4px',
										padding: '16px',
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
									dropdownIndicator: () => ({
										padding: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: `${theme.colors.mainPlaceholder}`,
									}),
								}}
								placeholder={placeholder}
								options={options}
								value={value}
								onChange={(value) => {
									onChange(value);
									handleSelectChange();
								}}
								onBlur={onBlur}
							/>
						</label>
						{error && <ErrorText>{error.message}</ErrorText>}
					</div>
				);
			}}
		/>
	);
};
