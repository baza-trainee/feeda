/** @jsxImportSource @emotion/react */

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'; ///
import { useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';

import { Button } from '~/src/components/Button/Button';
import { Input } from '~/src/components/Input/Input';
import { Title } from '~/src/components/Title/Title';
import { AppDispatch } from '~/src/redux/store/store';

import { getToken } from '../../../../redux/slices/auth/selectors';
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
  console.log(token);

  useEffect(() => {
    token && router.push('/projects');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = () => {
    const { email, password } = getValues();
    const data = { email, password };
    console.log(data, checkboxRef.current?.checked);
    dispatch(logIn(data));
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
            pattern={patternsCheck.password.source}
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
