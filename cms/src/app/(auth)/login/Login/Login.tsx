/** @jsxImportSource @emotion/react */
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; ///

import { useRouter } from 'next/navigation';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';
import { AppDispatch } from '~/src/redux/store/store';

import { logIn } from '../../authOperations/operations'; ///
import { CheckboxComponent } from '../../components/CheckboxComponent/CheckboxComponent';
import { btnText, formTitle, inputPlaceholderText, labelsTitle, patternsCheck } from '../../consts';
import { ForgotPassword } from './ForgotPassword/ForgotPassword';
import { ContainerCss, FormCss, InputCss, TitleCss } from './Login.styles';
import { logIn } from '../../authOperations/operations';

export function LoginForm() {
  const { control, clearErrors, getValues, handleSubmit } = useForm();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const typePasswordInput = isShowPassword ? 'text' : 'password';
  const iconInputPassword = isShowPassword ? 'eyeOpen' : 'eyeClosed';
  
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(getValues(), checkboxRef.current?.checked);

    dispatch(logIn(getValues()));
  };

  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.target as HTMLDivElement;
    if (clickedElement.tagName === 'svg' || clickedElement.tagName === 'path') {
      setIsShowPassword(!isShowPassword);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} css={FormCss}>
      <div css={TitleCss}>
        <Title title={formTitle.login} main />
      </div>
      <div css={ContainerCss}>
        <div css={InputCss}>
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
            clearErrors={clearErrors}
            label={labelsTitle.login}
            pattern={patternsCheck.login.source}
            minLength={6}
            maxLength={70}
            supportLabel="Неправильний логін"
          />
        </div>
        <div css={InputCss} onClick={onClickHandler}>
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
            // pattern={patternsCheck.password.source}
            // endIconId={iconInputPassword}
            supportLabel="Неправильний пароль"
          />
        </div>
      </div>
      <CheckboxComponent ref={checkboxRef} />
      <ForgotPassword />
      <Button btnType="submit" title={btnText.login} variant="primary"></Button>
    </form>
  );
}
