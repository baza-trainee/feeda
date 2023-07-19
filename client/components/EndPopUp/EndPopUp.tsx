'use client';
import Image from 'next/image';

import { Desc, Reminder, Section, Span, Title } from './EndPopUp.styles';

export function EndPopUp() {
	return (
		<Section>
			<Title>Дякуємо!</Title>
			<Desc>Твоя анкета буде оброблена протягом доби</Desc>
			<Reminder>
				Не забудь перевірити запрошення до{' '}
				<Span>
					<Image
						src={'/discord.svg'}
						alt="Discord icon"
						width={32}
						height={32}
						style={{ display: 'inline-block', verticalAlign: 'text-bottom' }}
					/>
					Discord
				</Span>{' '}
			</Reminder>
		</Section>
	);
}
