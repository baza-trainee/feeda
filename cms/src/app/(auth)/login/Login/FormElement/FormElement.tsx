'use client';
/** @jsxImportSource @emotion/react */
import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';
import { ErrorMessage } from '~/src/app/components/ErrorMessage/ErrorMessage';
import { Label } from '~/src/app/components/Label/Label';
import { TextField } from '~/src/app/components/TextField/TextField';
import { useFormElementState } from './helpers/useFormElementState';
import { ContainerCss } from './FormElement.styles';

interface formElementProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	inputPlaceholder: string;
	error: FieldErrors<FieldValues>;
	nameInput: string;
	register?: FieldValues;
	inputType: 'email' | 'password' | 'text';
}

export const FormElement = forwardRef<HTMLInputElement, formElementProps>(
	({ label, inputPlaceholder, error, nameInput, register, inputType, ...rest }, ref) => {
		const { elementState } = useFormElementState(error, nameInput);

		return (
			<div css={ContainerCss}>
				<Label state={elementState}>
					<>{label}</>
					<TextField
						state={elementState}
						inputType={inputType}
						placeholder={inputPlaceholder}
						ref={ref}
						{...register}
						{...rest}
						nameInput={nameInput}
					/>
					<ErrorMessage message={error[nameInput]?.message} />
				</Label>
			</div>
		);
	}
);
