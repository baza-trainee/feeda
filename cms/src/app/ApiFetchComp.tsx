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
    if (!authToken && token) {
      dispatch(loginByToken(token));
      setCookie('authToken', token);
    } else if (!authToken && !token) {
      router.push('/login');
    }
  }, [authToken, dispatch, isLoggedIn, router, token]);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (authToken) {
      dispatch(loginByToken(authToken));
      path !== '/login' ? router.push(path) : router.push('projects');
    } else if (!savedToken && remember) {
      remember && localStorage.setItem('token', `${authToken}`);
      dispatch(loginByToken(authToken));
      router.push('/projects');
    } else if (!authToken) {
      router.push('/login');
    }
  }, [authToken, dispatch, path, remember, router]);

  useEffect(() => {
    !isLoggedIn && !authToken && !path.includes('/login') && router.push('/login');
  }, [authToken, isLoggedIn, path, router]);

  return <></>;
}
