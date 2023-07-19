'use client';

import React, { useState } from 'react';

import Modal from '~components/Modal/Modal';

import { Button, Heading, Span, TextWrapper, Wrapper } from './StartPopUp.styles';

export function StartPopUp() {
	const [modal, setModal] = useState(false);

	const openModal = () => {
		setModal(true);
	};

	const closeModal = () => {
		setModal(false);
	};

	return (
		<Wrapper>
			<Heading>
				Вітаю! <br /> Ти за крок до роботи над
				<br />
				цікавими проєктами в командах
			</Heading>
			<TextWrapper>
				<p>
					Вся комунікація в командах ведеться у <b> Discord </b>
					<br />
					<br />
					Тобі залишилось ознайомитися з <Span onClick={openModal}>умовами та правилами участі на проєкті </Span>
					та заповнити анкету
				</p>
			</TextWrapper>
			<Button>Заповнити анкету</Button>
			<Modal onClose={closeModal} isOpen={modal} />
		</Wrapper>
	);
}
