'use client';
/** @jsxImportSource @emotion/react */

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';
import { useAppDispatch } from '~/src/redux/hooks';

import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../../app/(auth)/consts';
import { logIn, resetPassword, setNewPassword } from '../../redux/auth/operations';
import { ContainerCss, FormCss, newPassContainerCss, SubtitleCss, TitleCss } from './AuthForm.styles';
import { CheckBox } from './Checkbox/Checkbox';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';

interface ValuesTypes {
  email?: string;
  password?: string;
  newPassword?: string;
  repeatNewPassword?: string;
}

interface AuthFormTypes {
  newPass?: boolean;
  recover?: boolean;
}

export function AuthForm({ newPass, recover }: AuthFormTypes) {
  const { control, getValues, handleSubmit } = useForm();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const typePasswordInput = isShowPassword ? 'text' : 'password';
  const iconInputPassword = isShowPassword ? 'eyeClosed' : 'eyeOpen';

  const signIn = async ({ email, password }: ValuesTypes) => {
    email &&
      password &&
      dispatch(
        logIn({
          credentials: { email, password },
          remember: checkboxRef.current?.checked || false,
        })
      );
  };

  const setNewPass = ({ newPassword, repeatNewPassword }: ValuesTypes) => {
    newPassword &&
      repeatNewPassword &&
      dispatch(
        setNewPassword({
          password: newPassword,
          confirm_password: repeatNewPassword,
        })
      );
  };

  const handleSubmitForm = () => {
    const values = getValues();
    if (recover) {
      dispatch(resetPassword(values.email));
    } else if (newPass) {
      setNewPass(values);
    } else signIn(values);
  };

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLDivElement;
    if (clickedElement.tagName === 'svg' || clickedElement.tagName === 'path') {
      setIsShowPassword(!isShowPassword);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} css={FormCss}>
      <div>
        <Title css={TitleCss} title={recover || newPass ? formTitle.recover : formTitle.login} main />
        {recover && (
          <p css={SubtitleCss}>
            Для відновлення паролю введіть Вашу
            <br /> електронну адресу. Вам надійде лист
            <br /> із посиланням для зміни паролю
          </p>
        )}
      </div>
      <div css={[ContainerCss, newPass && newPassContainerCss]}>
        <Input
          placeholder={
            recover ? inputPlaceholderText.mail : newPass ? inputPlaceholderText.password : inputPlaceholderText.login
          }
          type={newPass ? 'password' : 'text'}
          name={newPass ? 'newPassword' : 'email'}
          id={newPass ? 'newPassword' : 'login'}
          control={control}
          label={recover ? labelsTitle.mail : newPass ? labelsTitle.newPassword : labelsTitle.login}
          pattern={newPass ? patternsCheck.password.source : patternsCheck.login.source}
          minLength={newPass ? 8 : 6}
          maxLength={newPass ? 12 : 70}
          {...(!newPass && {
            rules: {
              login: {
                required: true,
                minLength: 6,
                maxLength: 70,
                pattern: patternsCheck.login,
              },
            },
            supportLabel: 'Неправильний логін',
          })}
        />
        {!recover && (
          <Input
            placeholder={inputPlaceholderText.password}
            type={typePasswordInput}
            name={newPass ? 'repeatNewPassword' : 'password'}
            id={newPass ? 'repeatNewPassword' : 'password'}
            control={control}
            label={newPass ? labelsTitle.repeatNewPassword : labelsTitle.password}
            minLength={8}
            maxLength={12}
            pattern={patternsCheck.password.source}
            {...(!newPass && {
              endIconId: iconInputPassword,
              onclick: onClickHandler,
              supportLabel: 'Неправильний пароль',
            })}
          />
        )}
      </div>
      {!recover && !newPass && (
        <>
          <CheckBox ref={checkboxRef} />
          <ForgotPassword />
        </>
      )}
      <Button
        btnType="submit"
        title={recover ? btnText.send : newPass ? btnText.approve : btnText.login}
        variant="primary"
      />
    </form>
  );
}
