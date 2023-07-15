import React from 'react';
import { Text, Span, Welcome,Div } from './Condition.styles';

type ConstructHome = {
	openModal: () => void;
};

const ConstructHome: React.FC<ConstructHome> = ({ openModal }) => {
	return (
		<>
			<Welcome>
				Вітаю! <br /> Ти за крок до роботи над <br />
				цікавими проєктами в командах
			</Welcome>
			<Div >
				<Text>
					Вся комунікація в командах ведеться у <b> Discord </b>
					<br />
					<br />
					Тобі залишилось ознайомитися з <Span onClick={openModal}>умовами та правилами участі на проєкті </Span>
					та заповнити анкету
				</Text>
			</Div>
		</>
	);
};

export default ConstructHome;
