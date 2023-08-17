import React from 'react';

import { ApprovedTypes, useGlobalState } from '~/hooks/useGlobalState';
import useMobileDetect from '~/hooks/useMobileDetect';

import { Box, Input, Span, Wrapper } from './Checkbox.styled';

interface CheckBoxProps {
	name: string;
	labeltxt: string;
	id?: string;
	linkText: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ name, labeltxt, id, linkText }) => {
	const { state, setState } = useGlobalState();
	const mobile = useMobileDetect().isMobile();

	const showModal = () => {
		setState((prev) => ({ ...prev, modal: name, visible: true }));
	};

	const handleCheckboxChange = () => {
		setState((prev) => ({
			...prev,
			approved: prev.approved && {
				...prev.approved,
				[name as keyof ApprovedTypes]: prev.approved[name as keyof ApprovedTypes] ? false : true,
			},
		}));
	};

	return (
		<Wrapper>
			<label>
				<Input
					type="checkbox"
					id={id}
					onChange={handleCheckboxChange}
					checked={state.approved && state.approved[name as keyof ApprovedTypes]}
				/>
				<Box id="box" />
				{labeltxt}
			</label>
			{name === 'terms' && mobile && <br />}
			<Span onClick={showModal}>{linkText}</Span>
		</Wrapper>
	);
};
