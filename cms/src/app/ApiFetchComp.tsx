'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

export function ApiFetchComp() {
  const router = useRouter();
  const { isLogged } = useSelector(({ auth }) => auth);

  useEffect(() => {
    if (!isLogged) router.push('/login');
    // else dispatch(getInstructions());
    // eslint-disable-next-line
  }, []);
  return <></>;
}
