'use client';

import { Desc, Img, Reminder, SecondarySection, Section, Span, Title } from './EndPopUp.styles';

export function EndPopUp({ existingUser = false }: { existingUser?: boolean }) {
	return !existingUser ? (
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
	) : (
		<SecondarySection>
			<Title>Поштова скринька вже зареєстрована!</Title>
			<Desc>Якщо це не твоя електронна пошта - заповни анкету повторно</Desc>
			<Reminder>
				Перевір запрошення до{' '}
				<Span>
					<Img src={'/discord.svg'} alt="Discord icon" width="" height="" />
					Discord
				</Span>{' '}
			</Reminder>
		</SecondarySection>
	);
}
