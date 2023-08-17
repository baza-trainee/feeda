/** @jsxImportSource @emotion/react */
import { ReactNode, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { colors } from '~styles/theme';

import CloseIcon from '../../public/close.svg';
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
		<AnimatePresence>
			<Btn
				onClick={onClickHandler}
				onMouseDown={() => setIsPressed(true)}
				onMouseUp={() => setIsPressed(false)}
				disabled={isDisabled || false}
				whileHover={
					!isDisabled
						? { backgroundColor: colors.mainText, border: `1px solid ${colors.accent}`, color: colors.accent }
						: {}
				}
				whileTap={
					!isDisabled
						? { backgroundColor: colors.accent, border: `1px solid ${colors.accent}`, color: colors.mainText }
						: {}
				}
			>
				{children}
			</Btn>
		</AnimatePresence>
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
