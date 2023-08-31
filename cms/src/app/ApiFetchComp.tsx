'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

export function ApiFetchComp() {
  const router = useRouter();
  const { isLogged } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && !savedToken && !path.includes('/login')) {
      router.push('/login');
    } else if (!token && savedToken) {
      dispatch(loginByToken(savedToken));
      path !== '/login' ? router.push(path) : router.push('projects');
    } else if (token && !savedToken) {
      dispatch(getInstructions());
      if (remember) {
        localStorage.setItem('token', token);
      }
      router.push('/projects');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return <></>;
}
