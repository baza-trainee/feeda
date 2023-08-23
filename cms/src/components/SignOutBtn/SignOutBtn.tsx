import { Button } from '../Button/Button';

export function SignOutBtn() {
  const onBtnClick = () => {
    console.log('Sign Out');
  };

  return <Button variant="signout" func={onBtnClick} title="Вийти" icon="exit" />;
}
