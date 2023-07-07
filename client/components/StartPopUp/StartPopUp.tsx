'use client';

import React, { useState } from 'react';

import Agreement from 'components/Agreement/Agreement';
import Condition from 'components/Condition/Condition';
import { Button, Div,Wrapper } from 'components/Condition/Condition.styles';
import Container from 'components/Container/Container';

export function StartPopUp() {
	const [click, setClick] = useState(false);

	const handleClick = () => {
		setClick(true);
		console.log(click);
	};

	return (
		<Div>
			<Container>
				{click ? (
					<Agreement />
				) : (
					<Wrapper>
						<Condition />
						<Button onClick={handleClick}>Подати заявку</Button>
					</Wrapper>
				)}
			</Container>
		</Div>
	);
}
