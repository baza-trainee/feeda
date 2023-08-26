import { keyframes } from '@emotion/react';

export const rotate = keyframes`
100% {
	transform: rotate(1turn);
}`;

export const componentMotionProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
	transition: { duration: 0.3 },
};
