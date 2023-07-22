// 'use client';
/** @jsxImportSource @emotion/react */
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { Style } from './ErrorMessage.styles';

type textFieldProps = {
	message: string | undefined | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

export function ErrorMessage({ message }: textFieldProps) {
	return <span css={Style}>{typeof message === 'string' && message}</span>;
}
