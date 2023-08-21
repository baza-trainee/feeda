'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getInstructions } from '../slices/instructions';

export function ApiFetchComp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInstructions());
    // eslint-disable-next-line
  }, []);
  return <></>;
}
