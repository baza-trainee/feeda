'use client';
import { ReactNode } from 'react';
/** @jsxImportSource @emotion/react */
import { buttonStyle } from './Button.styles';

type ButtonProps = {
	children: ReactNode | string;
	isDisabled?: boolean;
	func?: () => void;
	btnType: 'button' | 'submit';
};

export const Button = ({ children, isDisabled, func, btnType }: ButtonProps) => {
	const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (func) func();
	};

	return (
		<button css={buttonStyle} onClick={(e) => onClickHandler(e)} disabled={isDisabled} type={btnType}>
			{children}
		</button>
	);
};
