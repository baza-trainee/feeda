import React from 'react';
import { Detail, Span, UnderHeader, UnderSpan, Welcome } from './Condition.styles';

type ConstructHome = {
	openModal: () => void;
};

const ConstructHome: React.FC<ConstructHome> = ({ openModal }) => {
	return (
		<>
			<Welcome>Вітаю! Ти за крок до роботи над цікавими проєктами в командах</Welcome>
			<UnderHeader>
				Вся комунікація в командах ведеться у <UnderSpan> Discord </UnderSpan>
			</UnderHeader>
			<Detail>
				Тобі залишилось ознайомитися з <Span onClick={openModal}>умовами та правилами участі на проєкті </Span>
				та заповнити анкету
			</Detail>
		</>
	);
};

export default ConstructHome;
