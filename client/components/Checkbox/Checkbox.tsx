import React, { useEffect, useState } from 'react';

import { ApprovedTypes, useGlobalState } from '~/hooks/useGlobalState';

import { Box, CheckboxLabel, Input, Span, Wrapper } from './Checkbox.styled';

interface CheckBoxProps {
	name: string;
	labeltxt: string;
	id?: string;
	linkText: string;
	onChange: () => void;
}

export const CheckBox = ({ name, labeltxt, id, linkText,onChange }: CheckBoxProps) => {
	const [screenWidth, setScreenWidth] = useState(0);
	const { state, setState } = useGlobalState();
	const { approved } = state;

	useEffect(() => {
		if (screenWidth > 768) return;
		window.addEventListener('resize', () => setScreenWidth(window.innerWidth));
		setScreenWidth(window.innerWidth);
		return () => window.removeEventListener('resize', () => setScreenWidth(window.innerWidth));
	}, [screenWidth]);

	const showModal = () => {
		setState((prev) => ({ ...prev, modal: name, visible: true }));
	};

	const handleCheckboxChange = () => {
		onChange();
		setState((prev) => ({
			...prev,
			approved: approved && {
				...approved,
				[name as keyof ApprovedTypes]: approved[name as keyof ApprovedTypes] ? false : true,
			},
		}));
	};

	return (
		<>
			<Wrapper>
				<CheckboxLabel>
					<Input
						type="checkbox"
						id={id}
						onChange={handleCheckboxChange}
						checked={approved && approved[name as keyof ApprovedTypes]}
					/>
					<Box id="box" />
					{labeltxt}
				</CheckboxLabel>
				{name === 'terms' && screenWidth < 768 && <br />}
				<Span onClick={showModal}>{linkText}</Span>
			</Wrapper>
		</>
	);
};
