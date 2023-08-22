import React from 'react';

import { AnimatePresence } from 'framer-motion';

import Title from '~components/Title/Title';
import { componentMotionProps } from '~styles/animations';

import { Desc, Img, Reminder, Section, Wrapper } from './EndPopUp.styles';

export const EndPopUp = () => {
	return (
		<AnimatePresence>
			<Wrapper key="end" {...componentMotionProps}>
				<Section>
					<Title main finish>
						Дякуємо!
					</Title>
					<Desc>Твоя анкета буде оброблена протягом доби</Desc>
					<Reminder>
						Не забудь перевірити запрошення
						<br />
						до{' '}
						<span>
							<Img src={'/discord.svg'} alt="Discord icon" width="" height="" /> Discord
						</span>
					</Reminder>
				</Section>
			</Wrapper>
		</AnimatePresence>
	);
};
