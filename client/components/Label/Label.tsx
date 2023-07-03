'use client';
import { ReactNode } from 'react';
import { labelStyle, labelErrorStyle, labelSuccessStyle } from './Label.styles';

interface labelProps {
	forHTML: string;
	children: ReactNode | string;
	isError: boolean;
	isSuccess: boolean;
}

const Label = ({ forHTML, children, isError, isSuccess }: labelProps) => {
	return (
		<label htmlFor={forHTML} css={() => (isError ? labelErrorStyle : isSuccess ? labelSuccessStyle : labelStyle)}>
			{children}
		</label>
	);
};

export default Label;
