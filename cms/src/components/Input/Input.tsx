import { useState } from 'react';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
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
}: InputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  return (
    <>
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
          onChange={pattern || label ? (ev) => setInputValue(ev.target.value) : undefined}
          defaultValue={defaultValue}
        />
        {endIconId && (
          <InputIconWrapper style={{ paddingLeft: 12 }} isDisabled={disabled}>
            <IconSprite icon={endIconId} />
          </InputIconWrapper>
        )}
      </InputWrapper>
      {supportLabel && (
        <SupportLabelComp htmlFor={id} isDisabled={disabled}>
          {supportLabel}
        </SupportLabelComp>
      )}
    </>
  );
}
