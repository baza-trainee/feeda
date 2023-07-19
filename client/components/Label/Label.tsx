'use client';
import { ReactNode } from 'react';

import { labelStyle } from './Label.styles';

interface labelProps {
	forHTML: string;
	children: ReactNode | string;
}

const Label = ({ forHTML, children }: labelProps) => {
	return (
		<label htmlFor={forHTML} css={labelStyle}>
			{children}
		</label>
	);
};

export default Label;
