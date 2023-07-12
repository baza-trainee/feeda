'use client';
/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { LabelCss } from './Label.styles';

type labelProps = {
	forHTML: string;
	children: ReactNode | string;
	state: 'error' | 'success' | 'default';
};

export const Label = ({ forHTML, children, state }: labelProps) => {
	return (
		<label htmlFor={forHTML} css={LabelCss[state]}>
			{children}
		</label>
	);
};
