import React from 'react';

import { useGlobalState } from '~/hooks/useGlobalState';
import Button from '~components/Button/Button';
import Title from '~components/Title/Title';

import { Span, TextWrapper, Wrapper } from './StartPopUp.styles';

export function StartPopUp(): JSX.Element {
	const { state, setState } = useGlobalState();

	const handleClick = () => {
		setState((prev) => ({ ...prev, location: 'application' }));
	};

	const showModal = () => {
		setState((prev) => ({ ...prev, modal: state.modal || 'terms', visible: true }));
	};

	return (
		<Wrapper>
			<Title main>
				Вітаю! <br /> Ти за крок до роботи над
				<br />
				цікавими проєктами в командах
			</Title>
			<TextWrapper>
				<p>
					Вся комунікація в командах ведеться у <b> Discord </b>
					<br />
					<br />
					Тобі залишилось ознайомитися з <Span onClick={showModal}>умовами та правилами участі на проєкті </Span>
					та заповнити анкету
				</p>
			</TextWrapper>
			<Button func={handleClick}>Заповнити анкету</Button>
		</Wrapper>
	);
}
