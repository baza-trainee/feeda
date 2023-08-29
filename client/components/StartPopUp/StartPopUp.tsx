import React from 'react';

import { AnimatePresence } from 'framer-motion';

import { useGlobalState } from '~/hooks/useGlobalState';
import useMobileDetect from '~/hooks/useMobileDetect';
import Button from '~components/Button/Button';
import Title from '~components/Title/Title';

import { Disc, Terms, TextWrapper, Wrapper } from './StartPopUp.styles';

export const StartPopUp = React.memo(() => {
	const { state, setState } = useGlobalState();
	const mobile = useMobileDetect().isMobile();

	const handleClick = () => {
		setState((prev) => ({ ...prev, location: 'application' }));
	};

	const showModal = () => {
		setState((prev) => ({ ...prev, modal: state.modal || 'terms', visible: true }));
	};

	return (
		<AnimatePresence>
			<Wrapper
				key="start"
				initial={{ opacity: 0, y: '100px' }}
				animate={{ opacity: 1, y: '0px' }}
				exit={{ opacity: 0, y: '-100px' }}
				transition={{ duration: 0.5 }}
			>
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
						Тобі залишилось ознайомитися з <Terms onClick={showModal}>умовами та правилами участі в проєкті </Terms>
						та заповнити анкету
					</p>
				</TextWrapper>
				<Button func={handleClick}>Заповнити анкету</Button>
			</Wrapper>
		</AnimatePresence>
	);
});

StartPopUp.displayName = 'StartPopUp';
