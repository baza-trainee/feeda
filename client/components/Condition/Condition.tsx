import { Detail, Span, UnderHeader, UnderSpan,Welcome } from './Condition.styles';

const ConstructHome = () => {
  return (
    <>
      <Welcome>
        Вітаю! Ти за крок до роботи над цікавими проєктами у командах
      </Welcome>
      <UnderHeader>Май на увазі, що вся комунікація у командах ведеться у <UnderSpan> Discord </UnderSpan> </UnderHeader>
      <Detail>
        Тому не забудь ознайомитися з іншими
        <Span>умовами та правилами участі на проєкті </Span>
      </Detail>
    </>
  );
};

export default ConstructHome;
