import React, { ChangeEvent } from 'react';

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';

interface CustomCheckboxProps {
	label: string;
	linkText: string;
	isChecked: boolean;
	onCheckboxChange: (isChecked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, linkText, isChecked, onCheckboxChange }) => {
	const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
		onCheckboxChange(event.target.checked);
	};

	const checkboxStyles: CheckboxProps['sx'] = {
		color: isChecked ? '#FFC107' : '#000000',
		'&.Mui-checked': {
			color: '#FFC107',
		},
	};

	const theme = createTheme({
		typography: {
			fontSize: 12,
		},
	});

	const linkStyles = {
		color: '#0029FF',
	};

	return (
		<ThemeProvider theme={theme}>
			<FormControlLabel
				control={
					<Checkbox checked={isChecked} onChange={handleCheckboxChange} color="default" sx={{ checkboxStyles }} />
				}
				label={
					<>
						{label}{' '}
						<Link href="/" style={linkStyles}>
							{linkText}
						</Link>
					</>
				}
			/>
		</ThemeProvider>
	);
};

export default CustomCheckbox;
