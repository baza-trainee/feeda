'use client';
<<<<<<< HEAD
import { ReactNode } from 'react';

/** @jsxImportSource @emotion/react */
import { buttonStyle } from './Button.styles';
=======
import { ReactNode, useState } from 'react';

/** @jsxImportSource @emotion/react */
import { buttonStyle, onClickButtonStyle } from './Button.styles';
>>>>>>> develop

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
		console.log('isPressed', isPressed);
	};

	const onMouseUpHandler = () => {
		setIsPressed(false);
	};

	return (
		<button
			css={[buttonStyle, isPressed && onClickButtonStyle]}
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
