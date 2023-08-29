'use client';
/** @jsxImportSource @emotion/react */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';
import { AppDispatch } from '~/src/redux/store/store';

import { resetPassword } from '../../authOperations/operations';
import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../../consts';
import { BlockCss, HeaderCss, InputCss, RecoverFormCss, SubtitleCss } from './RecoverPass.styles';

export function RecoverForm() {
  const { control, clearErrors, getValues } = useForm();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email } = getValues();
    const data = { email };
    console.log(data);
    dispatch(resetPassword(data));
  };

  return (
    <form onSubmit={handleSubmit} css={RecoverFormCss}>
      <div css={BlockCss}>
        <header css={HeaderCss}>
          <Title title={formTitle['recover-password']} main />
          <p css={SubtitleCss}>
            Для відновлення паролю введіть Вашу електронну адресу. Вам надійде лист із посиланням для зміни паролю
          </p>
        </header>
        <div css={InputCss}>
          <Input
            placeholder={inputPlaceholderText.mail}
            type="text"
            name="email"
            id="login"
            control={control}
            clearErrors={clearErrors}
            label={labelsTitle.mail}
            pattern={patternsCheck.login.source}
            minLength={6}
            maxLength={70}
          />
        </div>
      </div>
      <Button btnType="submit" title={btnText.login} variant="primary"></Button>
    </form>
  );
}
