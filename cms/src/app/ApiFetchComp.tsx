'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getSpecialities, getTypesParticipation, getTypesProject } from '../slices/instructions';

export function ApiFetchComp() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpecialities());
    dispatch(getTypesParticipation());
    dispatch(getTypesProject());
    // eslint-disable-next-line
  }, []);
  return <></>;
}
