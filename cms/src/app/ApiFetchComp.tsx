'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname, useRouter } from 'next/navigation';

import { loginByToken } from '../redux/auth/loginSlice';
import { getInstructions } from '../redux/instructions';
import { AppDispatch } from '../redux/store/store';

export function ApiFetchComp() {
  const dispatch = useDispatch<AppDispatch>();
  const path = usePathname();
  const router = useRouter();
  const { token, remember } = useSelector(({ auth }) => auth);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!token && !savedToken && !path.includes('/login')) {
      router.push('/login');
    } else if (!token && savedToken) {
      dispatch(loginByToken(savedToken));
      path !== '/login' ? router.push(path) : router.push('projects');
      // dispatch(getInstructions());
    } else if (token && !savedToken) {
      // dispatch(getInstructions());
      if (remember) {
        localStorage.setItem('token', token);
      }
      router.push('/projects');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return <></>;
}
