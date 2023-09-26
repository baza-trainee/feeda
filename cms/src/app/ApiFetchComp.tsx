'use client';

import { useEffect } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { loginByToken } from '../redux/auth/loginSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export function ApiFetchComp() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const { token, remember, isLoggedIn } = useAppSelector(({ auth }) => auth);

  useEffect(() => {
    const rememberCreadentials = localStorage.getItem('remember');
    if (token && !isLoggedIn) {
      dispatch(loginByToken({ token, remember: rememberCreadentials }));
      path !== '/login' ? router.push(path) : router.push('projects');
    } else if (!isLoggedIn && !token && !path.includes('/login')) {
      router.push('/login');
    }
    isLoggedIn && router.push(path.includes('/login') ? '/projects' : path);
  }, [dispatch, isLoggedIn, path, remember, router, token]);

  return <></>;
}
