'use client';
/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { LabelError, LabelSuccess, LabelDefault } from './Label.styles';

type labelProps = {
	forHTML?: string;
	children: string | ReactNode | JSX.Element;
	state: 'error' | 'success' | 'default';
};

export const Label = ({ forHTML, children, state }: labelProps) => {
	if (state === 'error') return <LabelError htmlFor={forHTML}>{children}</LabelError>;

	if (state === 'success') return <LabelSuccess htmlFor={forHTML}>{children}</LabelSuccess>;

	return <LabelDefault htmlFor={forHTML}>{children}</LabelDefault>;
};
