import { ReactNode, useState } from 'react';

import Image from 'next/image';

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
		<CloseBtn>
			<Image src="/close.svg" width={24} height={24} alt="Close" onClick={func} />
		</CloseBtn>
	);
};

export default Button;
