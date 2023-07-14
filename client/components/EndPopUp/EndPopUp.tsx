'use client';

import { Desc, Img, Link, Reminder, Section, Span, Title } from './EndPopUp.styles';

export function EndPopUp({ existingUser = false }: { existingUser?: boolean }) {
	return existingUser ? (
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
		<Section>
			<Title>Поштова скринька вже зареєстрована!</Title>
			<Desc>
				Якщо це не твоя електронна пошта - <br /> <Link>заповни анкету повторно</Link>
			</Desc>
			<Reminder>
				Перевір запрошення <br /> до{' '}
				<Span>
					<Img src={'/discord.svg'} alt="Discord icon" width="" height="" />
					Discord
				</Span>{' '}
			</Reminder>
		</Section>
	);
}
