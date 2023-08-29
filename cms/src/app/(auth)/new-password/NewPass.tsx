'use client';
/** @jsxImportSource @emotion/react */
import { useForm } from 'react-hook-form';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';

import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../consts';
import { NewPassFormCss } from './NewPass.styles';

export function NewPassForm() {
  const { control, clearErrors, getValues } = useForm();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(getValues());
  };

  return (
    <form onSubmit={handleSubmit} css={NewPassFormCss}>
      <Title title={formTitle['recover-password']} main />
      <Input
        placeholder={inputPlaceholderText.password}
        type="password"
        name="newPassword"
        id="newPassword"
        control={control}
        clearErrors={clearErrors}
        label={labelsTitle['new-password']}
        pattern={patternsCheck.login.source}
        minLength={8}
        maxLength={12}
      />
      <Input
        placeholder={inputPlaceholderText.password}
        type="password"
        name="repeatNewPassword"
        id="repeatNewPassword"
        control={control}
        clearErrors={clearErrors}
        label={labelsTitle['repeat-new-password']}
        pattern={patternsCheck.login.source}
        minLength={8}
        maxLength={12}
      />
      <Button btnType="submit" title={btnText.approve} variant="primary"></Button>
    </form>
  );
}
