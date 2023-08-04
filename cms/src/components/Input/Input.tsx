// 'use client';

import { InputComp, InputWrapper, LabelComp, SupportLabelComp } from './Input.styles';

type InputProps = {
  placeholder?: string;
  type?: string;
  value?: string;
  onInputFunc?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // onInputFunc?: () => void;
  name?: string;
  className?: string;
  id?: string;
  label?: string;
  supportLabel?: string;
  disabled?: boolean;
  inputCss?: object[];
  labelCss?: object[];
  supportLabelCss?: object[];
  begIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export function Input({
  placeholder,
  type,
  value,
  onInputFunc,
  name,
  id,
  label,
  supportLabel,
  disabled,
  begIcon,
  endIcon,
  inputCss,
  labelCss,
  supportLabelCss,
}: InputProps) {
  return (
    <>
      {label && (
        <LabelComp css={labelCss} htmlFor={id}>
          {label}
        </LabelComp>
      )}
      <InputWrapper>
        {begIcon && begIcon}
        <InputComp
          id={id}
          css={inputCss}
          placeholder={placeholder}
          type={type || 'text'}
          value={value}
          name={name}
          onInput={onInputFunc}
          disabled={disabled}
        />
        {endIcon && endIcon}
      </InputWrapper>
      {supportLabel && (
        <SupportLabelComp css={supportLabelCss} htmlFor={id}>
          {supportLabel}
        </SupportLabelComp>
      )}
    </>
  );
}
