'use client';

import React, { useState } from 'react';
import Agreement from 'components/Agreement/Agreement';
import Condition from 'components/Condition/Condition';
import { Wrapper, Button } from './StartPopUp.styles';

export function StartPopUp() {
	const [click, setClick] = useState(false);

	const openModal = () => {
		setClick(true);
	};

	const closeModal = () => {
		setClick(false);
	};

	return (
		<Wrapper>
			<Condition openModal={openModal} />
				<Button>Заповнити анкету</Button>
			<Agreement onClose={closeModal} isOpen={click} />
		</Wrapper>
	);
}
