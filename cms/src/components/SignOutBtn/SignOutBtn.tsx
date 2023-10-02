import { useDispatch, useSelector } from 'react-redux';

import { logOut } from '~/src/redux/auth/operations';
import { AppDispatch, StoreTypes } from '~/src/redux/store/store';

import { Button } from '../Button/Button';

export function SignOutBtn() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: StoreTypes) => state.auth);

  const handleSignOut = () => {
    token && dispatch(logOut(token));
  };

  return <Button variant="signout" func={handleSignOut} title="Вийти" icon="exit" />;
}
