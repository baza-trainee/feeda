'use client';
// import Image from 'next/image';

import { Desc, Img, Reminder, Section, Span, Title } from './GoodbyePage.styles';

export function GoodbyePage() {
	return (
		<Section>
			<Title>Дякуємо!</Title>
			<Desc>Твоя анкета буде оброблена протягом доби</Desc>
			<Reminder>
				Не забудь перевірити запрошення до{' '}
				<Span>
					<Img src={'/discord.svg'} alt="Discord icon" width="" height="" />
					Discord
				</Span>{' '}
			</Reminder>
		</Section>
	);
}
