// 'use client';
/** @jsxImportSource @emotion/react */
import { InputHTMLAttributes, forwardRef } from 'react';
import { InputStyle, DefaultInputStyle } from './TextField.styles';

// type textFieldProps = {
// 	curId?: string;
// 	placeholder: string;
// 	state: 'error' | 'success' | 'default';
// 	inputType: 'email' | 'password' | 'text';
// };

// export function TextField({ state, inputType, curId, placeholder }: textFieldProps) {
// 	return <input css={[InputStyle[state], DefaultInputStyle]} type={inputType} id={curId} placeholder={placeholder} />;
// }

interface textFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	curId?: string;
	placeholder: string;
	state: 'error' | 'success' | 'default';
	inputType: 'email' | 'password' | 'text';
	nameInput: string;
}

export const TextField = forwardRef<HTMLInputElement, textFieldProps>((props, ref) => {
	const { curId, placeholder, state, inputType, nameInput, ...rest } = props;

	return (
		<input
			name={nameInput}
			css={[InputStyle[state], DefaultInputStyle]}
			type={inputType}
			id={curId}
			placeholder={placeholder}
			ref={ref}
			{...rest}
		/>
	);
});
