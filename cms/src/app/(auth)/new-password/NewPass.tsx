'use client';
/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useRouter } from 'next/navigation';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';
import { AppDispatch } from '~/src/redux/store/store';

import { setNewPassword } from '../authOperations/operations';
import { CheckboxComponent } from '../components/CheckboxComponent/CheckboxComponent';
import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../consts';
import { NewPassFormCss } from './NewPass.styles';

export function NewPassForm() {
  const { control, clearErrors, getValues } = useForm();

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newPassword, repeatNewPassword } = getValues();
    const data = { newPassword, repeatNewPassword };
    dispatch(setNewPassword(data));
    console.log(data);
    if (newPassword === repeatNewPassword) {
      router.push('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} css={NewPassFormCss}>
      <div>
        <Title title={formTitle['recover-password']} main />
      </div>
      <div>
        <div>
          <Input
            placeholder={inputPlaceholderText.password}
            type="password"
            name="newPassword"
            id="newPassword"
            control={control}
            clearErrors={clearErrors}
            label={labelsTitle['new-password']}
            // pattern={patternsCheck.login.source}
            minLength={8}
            maxLength={12}
          />
        </div>
        <div>
          <Input
            placeholder={inputPlaceholderText.password}
            type="password"
            name="repeatNewPassword"
            id="repeatNewPassword"
            control={control}
            clearErrors={clearErrors}
            label={labelsTitle['repeat-new-password']}
            // pattern={patternsCheck.login.source}
            minLength={8}
            maxLength={12}
          />
        </div>
      </div>
      <CheckboxComponent />
      <Button btnType="submit" title={btnText.login} variant="primary"></Button>
    </form>
  );
}
