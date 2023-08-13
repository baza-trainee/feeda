'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { ErrorText } from '../SelectField/SelectField.style';
import { InputComp, InputIconWrapper, InputWrapper, LabelComp, SupportLabelComp } from './Input.styles';

type InputProps = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  label?: string;
  supportLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  begIconId?: IconType | undefined;
  endIconId?: IconType | undefined;
  control: Control;
  rules?: object;
  clearErrors: (name?: string | string[]) => void;
};

export function Input({
  placeholder,
  type,
  defaultValue = '',
  name,
  id,
  label,
  supportLabel,
  disabled = false,
  required,
  readonly,
  minLength,
  maxLength,
  pattern,
  begIconId,
  endIconId,
  control,
  rules,
  clearErrors,
}: InputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange }, fieldState: { error } }) => {
        const handleChange = () => {
          clearErrors(name);
        };
        return (
          <div id="input-wrapper">
            {label && (
              <LabelComp
                htmlFor={id}
                inputValueLen={inputValue.length}
                isDisabled={disabled}
                checkIsValid={Boolean(pattern && inputValue.length)}
              >
                {label}
              </LabelComp>
            )}
            <InputWrapper checkIsValid={Boolean(pattern && inputValue.length)}>
              {begIconId && (
                <InputIconWrapper style={{ paddingRight: 12 }} isDisabled={disabled}>
                  <IconSprite icon={begIconId} />
                </InputIconWrapper>
              )}
              <InputComp
                style={{ padding: begIconId || endIconId ? '18px 0' : '18px 16px' }}
                id={id}
                placeholder={placeholder}
                readOnly={readonly}
                type={type || 'text'}
                name={name}
                disabled={disabled}
                required={required}
                maxLength={maxLength}
                minLength={minLength}
                pattern={pattern}
                defaultValue={defaultValue}
                onChange={(ev) => {
                  if (pattern || label) setInputValue(ev.target.value);
                  handleChange();
                  onChange(ev.target.value);
                }}
              />
              {endIconId && (
                <InputIconWrapper style={{ paddingLeft: 12 }} isDisabled={disabled}>
                  <IconSprite icon={endIconId} />
                </InputIconWrapper>
              )}
            </InputWrapper>
            {supportLabel && (
              <SupportLabelComp id="support-label" htmlFor={id} isDisabled={disabled}>
                {supportLabel}
              </SupportLabelComp>
            )}
            {error && <ErrorText>{error.message}</ErrorText>}
          </div>
        );
      }}
    />
  );
}
