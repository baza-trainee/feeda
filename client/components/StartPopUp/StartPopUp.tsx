import React from 'react';

import { useGlobalState } from '~/hooks/useGlobalState';
import useMobileDetect from '~/hooks/useMobileDetect';
import Button from '~components/Button/Button';
import Title from '~components/Title/Title';

import { Disc, Terms, TextWrapper, Wrapper } from './StartPopUp.styles';

export function StartPopUp(): JSX.Element {
	const { state, setState } = useGlobalState();
	const mobile = useMobileDetect().isMobile();

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
					Вся комунікація в командах{mobile && <br />} ведеться у <Disc> Discord </Disc>
					<br />
					<br />
					Тобі залишилось ознайомитися з <Terms onClick={showModal}>умовами та правилами участі на проєкті </Terms>
					та заповнити анкету
				</p>
			</TextWrapper>
			<Button func={handleClick}>Заповнити анкету</Button>
		</Wrapper>
	);
}
