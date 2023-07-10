'use client';
import { ReactNode, useState } from 'react';

/** @jsxImportSource @emotion/react */
import { buttonStyle, onClickButtonStyle } from './Button.styles';

interface ButtonProps {
	children: ReactNode | string;
	isDisabled?: boolean;
	func: () => void;
}

const Title = ({ children, isDisabled, func }: ButtonProps) => {
	const [isPressed, setIsPressed] = useState(false);

	const onClickHandler = () => {
		func();
	};

	const onMouseDownHandler = () => {
		setIsPressed(true);
	};

	const onMouseUpHandler = () => {
		setIsPressed(false);
	};

	return (
		<button
			css={[
				buttonStyle,
				isPressed && onClickButtonStyle, // Змінюємо колір кнопки на "червоний", коли кнопка натиснута
			]}
			onClick={onClickHandler}
			onMouseDown={onMouseDownHandler}
			onMouseUp={onMouseUpHandler}
			disabled={isDisabled}
		>
			{children}
		</button>
	);
};

export default Title;
