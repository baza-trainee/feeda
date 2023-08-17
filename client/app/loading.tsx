'use client';

import styled from '@emotion/styled';

import { rotate } from '~styles/animations';

const Loader = styled.div`
	position: fixed;
	top: 45%;
	left: 45%;

	width: 70px;
	height: 70px;

	display: grid;
	border-radius: 50%;

	mask: radial-gradient(farthest-side, #0000 40%, #000 41%);
	-webkit-mask: radial-gradient(farthest-side, #0000 40%, #000 41%);

	background: linear-gradient(0deg, #766df480 50%, #766df4ff 0) center/4px 100%,
		linear-gradient(90deg, #766df440 50%, #766df4bf 0) center/100% 4px;
	background-repeat: no-repeat;

	animation: ${rotate} 1s infinite steps(12);

	&::before,
	&::after {
		content: '';
		grid-area: 1/1;
		border-radius: 50%;
		background: inherit;
		opacity: 0.915;
		transform: rotate(30deg);
	}

	&::after {
		opacity: 0.83;
		transform: rotate(60deg);
	}
`;

export default function Loading() {
	return <Loader />;
}
