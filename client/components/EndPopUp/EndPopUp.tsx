'use client';

import { Desc, Img, Reminder, Section, Title, Wrapper } from './EndPopUp.styles';

export function EndPopUp() {
	return (
		<Wrapper>
			<Section>
				<Title>Дякуємо!</Title>
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
	);
}
