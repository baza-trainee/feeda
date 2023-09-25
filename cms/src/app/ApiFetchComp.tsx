'use client';

import { useEffect } from 'react';

import { getCookie, getCookies, setCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

import { loginByToken } from '../redux/auth/loginSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

export function ApiFetchComp() {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const { token, remember, isLoggedIn } = useAppSelector(({ auth }) => auth);
  const authToken = getCookie('authToken');

  console.log('Cookies:', getCookies());

  useEffect(() => {
    if (!isLoggedIn && token) {
      dispatch(loginByToken(token));
      setCookie('authToken', token);
    }
  }, [dispatch, isLoggedIn, token]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!authToken && savedToken) {
      dispatch(loginByToken(savedToken));
      path !== '/login' ? router.push(path) : router.push('projects');
    } else if (authToken && !savedToken) {
      if (remember) {
        localStorage.setItem('token', authToken);
      }
      router.push('/projects');
    }
    //// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, path, remember, router, authToken]);

  useEffect(() => {
    !isLoggedIn && !authToken && !path.includes('/login') && router.push('/login');
  }, [isLoggedIn, path, router, authToken]);

  return <></>;
}
