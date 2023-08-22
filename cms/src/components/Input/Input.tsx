'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { ErrorText } from '../SelectField/SelectField.style';
import {
  firstIconStyles,
  InputComp,
  InputIconWrapper,
  InputWrapper,
  LabelComp,
  lastIconStyles,
  SupportLabelComp,
} from './Input.styles';

type InputProps = {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  label?: string;
  supportLabel?: string;
  onValidLabel?: string;
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
  clearErrors?: (name?: string | string[]) => void;
  onTypeFunc?: (value: string) => void;
};

export function Input({
  placeholder,
  type = 'text',
  defaultValue = '',
  name,
  id,
  label,
  supportLabel,
  onValidLabel,
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
  onTypeFunc,
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
          clearErrors && clearErrors(name);
        };
        return (
          <div id="input-wrapper">
            {label && (
              <LabelComp
                htmlFor={id}
                inputValueLen={inputValue?.length}
                isDisabled={disabled}
                checkIsValid={Boolean(pattern && inputValue?.length)}
              >
                {label}
              </LabelComp>
            )}
            <InputWrapper checkIsValid={Boolean(pattern && inputValue?.length)}>
              {begIconId && (
                <InputIconWrapper css={[firstIconStyles]} isDisabled={disabled}>
                  <IconSprite icon={begIconId} />
                </InputIconWrapper>
              )}
              <InputComp
                begIcon={Boolean(begIconId)}
                endIcon={Boolean(endIconId)}
                id={id}
                placeholder={placeholder}
                readOnly={readonly}
                type={type}
                name={name}
                disabled={disabled}
                required={required}
                maxLength={maxLength}
                minLength={minLength}
                pattern={pattern}
                defaultValue={defaultValue}
                onChange={(ev) => {
                  if (pattern || label) setInputValue(ev.target.value);
                  if (onTypeFunc) onTypeFunc(ev.target.value);
                  handleChange();
                  onChange(ev.target.value);
                }}
              />
              {endIconId && (
                <InputIconWrapper css={[lastIconStyles]} isDisabled={disabled}>
                  <IconSprite icon={endIconId} />
                </InputIconWrapper>
              )}
            </InputWrapper>
            {(supportLabel || onValidLabel) && (
              <SupportLabelComp
                id={supportLabel ? 'support-label' : 'on-valid-label'}
                htmlFor={id}
                isDisabled={disabled}
              >
                {supportLabel || onValidLabel}
              </SupportLabelComp>
            )}
            {error && <ErrorText>{error.message}</ErrorText>}
          </div>
        );
      }}
    />
  );
}
