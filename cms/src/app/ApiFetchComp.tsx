'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getInstructions } from '../redux/instructions';
import { AppDispatch } from '../redux/store/store';

export function ApiFetchComp() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getInstructions());
    // eslint-disable-next-line
  }, []);
  return <></>;
}
