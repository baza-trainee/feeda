import { ReactNode, useState } from 'react';

import CloseIcon from '../../public/close.svg';
/** @jsxImportSource @emotion/react */
import { Btn, CloseBtn } from './Button.styles';

type ButtonProps = {
	children?: ReactNode | string;
	isDisabled?: boolean;
	func: () => void;
	closeButton?: boolean;
};

const Button = ({ children, isDisabled, func, closeButton }: ButtonProps) => {
	const [isPressed, setIsPressed] = useState(false);

	const onClickHandler = () => {
		func();
	};

	return !closeButton ? (
		<Btn
			onClick={onClickHandler}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
			disabled={isDisabled || false}
			isPressed={isPressed}
		>
			{children}
		</Btn>
	) : (
		<CloseBtn
			onClick={func}
			onMouseDown={() => setIsPressed(true)}
			onMouseUp={() => setIsPressed(false)}
			isPressed={isPressed}
		>
			<CloseIcon />
		</CloseBtn>
	);
};

export default Button;
