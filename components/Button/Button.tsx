"use client";
import { ReactNode } from "react";
/** @jsxImportSource @emotion/react */
import { buttonStyle } from "./Button.styles";

interface ButtonProps {
	children: ReactNode | string;
	isDisabled?: boolean;
}

const Title = ({ children, isDisabled }: ButtonProps) => {
	return (
		<button
			css={buttonStyle}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default Title;
