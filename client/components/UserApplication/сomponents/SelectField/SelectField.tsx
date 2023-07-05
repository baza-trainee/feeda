import { Controller } from 'react-hook-form';
import Select from 'react-select';

import { theme } from 'styles/theme';

import { labelStyles } from '../FormField/FormField.slyles';

export const CustomSelect = ({ control, name, rules, options, placeholder, clearErrors, valueGetter, title }) => {
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
								value={computedValue}
								onChange={(selectedOption) => {
									onChange(selectedOption);
									handleSelectChange();
								}}
								onBlur={() => onBlur()}
							/>
						</label>
						{error && (
							<span style={{ color: '#DF4242', display: 'block', marginTop: '4px', fontSize: '12px' }}>
								{error.message}
							</span>
						)}
					</div>
				);
			}}
		/>
	);
};
