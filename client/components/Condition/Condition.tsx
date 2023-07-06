import { Detail, Span, UnderHeader, UnderSpan,Welcome } from './Condition.styles';

const ConstructHome = () => {
	return (
		<>
			<Welcome>
        Вітаю! Ти за крок до роботи над цікавими проєктами у командах
			</Welcome>
			<UnderHeader>Вся комунікація в командах ведеться у  <UnderSpan> Discord </UnderSpan> </UnderHeader>
			<Detail>
			Тобі залишилось ознайомитися з <Span>умовами та правилами участі на проєкті </Span>
				та заповнити анкету
			</Detail>
		</>
	);
};

export default ConstructHome;
