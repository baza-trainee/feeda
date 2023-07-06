"use client";
import { ReactNode } from "react";
/** @jsxImportSource @emotion/react */
import { buttonStyle } from "./Button.styles";

interface ButtonProps {
	children: ReactNode | string;
	isDisabled?: boolean;
	func: () => void;
}

const Button = ({ children, isDisabled, func }: ButtonProps) => {
	const onClickHandler = () => {
		func();
	};
	return (
		<button
			css={buttonStyle}
			onClick={onClickHandler}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default Button;
