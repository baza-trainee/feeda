'use client';

import { Desc, Img, Reminder, Section, Span, Title } from './EndPopUp.styles';

export function EndPopUp() {
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
