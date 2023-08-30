/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; ///
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';
import { loginByToken } from '~/src/redux/auth/loginSlice';
import { getInstructions } from '~/src/redux/instructions';
import { AppDispatch } from '~/src/redux/store/store';

import { getToken } from '../../../../redux/auth/selectors';
import { logIn } from '../../authOperations/operations';
import { CheckBox } from '../../components/Checkbox/Checkbox';
// import { CheckboxComponent } from '../../components/CheckboxComponent/CheckboxComponent';
import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../../consts';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';
import { ContainerCss, FormCss, TitleCss } from './Login.styles';

export function LoginForm() {
  const { control, clearErrors, getValues, handleSubmit } = useForm();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const typePasswordInput = isShowPassword ? 'text' : 'password';
  const iconInputPassword = isShowPassword ? 'eyeClosed' : 'eyeOpen';

  const router = useRouter();

  const token = useSelector(getToken);
  // console.log(token);

  useEffect(() => {
    console.log('Є токен? ', token);
    if (!token) {
      const savedToken = localStorage.getItem('token');
      savedToken && dispatch(loginByToken(savedToken));
    } else {
      dispatch(getInstructions());
      router.back();
    }
    // else router.replace('/projects');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = () => {
    const { email, password } = getValues();
    const data = { email, password };
    dispatch(logIn(data)).then((response) => {
      if (response.meta.requestStatus === 'fulfilled' && checkboxRef.current?.checked) {
        // router.replace('/projects');
        localStorage.setItem('token', response.payload.token);
        router.replace('/projects');
      }
    });
  };

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLDivElement;
    if (clickedElement.tagName === 'svg' || clickedElement.tagName === 'path') {
      setIsShowPassword(!isShowPassword);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} css={FormCss}>
      <Title css={TitleCss} title={formTitle.login} main />
      <div css={ContainerCss}>
        <Input
          placeholder={inputPlaceholderText.login}
          type="text"
          name="email"
          id="login"
          control={control}
          rules={{
            login: {
              required: true,
              minLength: 6,
              maxLength: 70,
              pattern: patternsCheck.login,
            },
          }}
          label={labelsTitle.login}
          pattern={patternsCheck.login.source}
          minLength={6}
          maxLength={70}
          supportLabel="Неправильний логін"
        />
        <Input
          placeholder={inputPlaceholderText.password}
          type={typePasswordInput}
          name="password"
          id="password"
          control={control}
          clearErrors={clearErrors}
          label={labelsTitle.password}
          minLength={8}
          maxLength={12}
          pattern={patternsCheck.password.source}
          endIconId={iconInputPassword}
          supportLabel="Неправильний пароль"
          onclick={onClickHandler}
        />
      </div>
      <CheckBox ref={checkboxRef} />
      <ForgotPassword />
      <Button btnType="submit" title={btnText.login} variant="primary"></Button>
    </form>
  );
}
