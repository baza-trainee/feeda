import Title from '~components/Title/Title';

import { Desc, Img, Reminder, Section, Wrapper } from './EndPopUp.styles';

export function EndPopUp() {
	return (
		<Wrapper>
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
	);
}
