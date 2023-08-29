'use client';

import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Control, Controller } from 'react-hook-form';

import { ClassNames } from '@emotion/react';
import uk_UA from 'date-fns/locale/uk';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { ErrorText } from '../SelectField/SelectField.style';
import {
  firstIconStyles,
  InputComp,
  InputIconWrapper,
  inputStyles,
  InputWrapper,
  LabelComp,
  lastIconStyles,
  SupportLabelComp,
} from './Input.styles';

import 'react-datepicker/dist/react-datepicker.css';

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
  onclick?: () => void;
  pattern?: string;
  begIconId?: IconType | undefined;
  endIconId?: IconType | undefined;
  control: Control;
  rules?: object;
  onTypeFunc?: (value: string) => void;
};

export function Input({
  placeholder,
  type = 'text',
  defaultValue,
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
  onclick,
  begIconId,
  endIconId,
  control,
  rules,
  onTypeFunc,
}: InputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  registerLocale('uk_UA', uk_UA);

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange }, fieldState: { error } }) => {
        const handleChange = (value: string) => {
          onChange(value);
          if (onTypeFunc) onTypeFunc(value);
          if (pattern || label || type === 'date') setInputValue(value);
        };
        return (
          <ClassNames>
            {({ css }) => (
              <div id="input-wrapper" style={{ position: 'relative' }} onClick={onclick}>
                {label && (
                  <LabelComp
                    htmlFor={id}
                    inputValueLen={Boolean(inputValue?.length)}
                    isDisabled={disabled}
                    checkIsValid={Boolean(pattern && inputValue?.length)}
                    isError={Boolean(error)}
                  >
                    {label}
                  </LabelComp>
                )}
                <InputWrapper checkIsValid={Boolean(pattern && inputValue?.length)} isError={Boolean(error)}>
                  {begIconId && (
                    <InputIconWrapper css={firstIconStyles} isDisabled={disabled}>
                      <IconSprite icon={begIconId} />
                    </InputIconWrapper>
                  )}
                  {type === 'date' ? (
                    <DatePicker
                      todayButton="Сьогодні"
                      dateFormat="dd MMMM yyyy"
                      locale="uk_UA"
                      placeholderText={placeholder}
                      selected={inputValue}
                      className={css(inputStyles)}
                      readOnly={readonly}
                      calendarStartDay={1}
                      onChange={handleChange}
                    />
                  ) : (
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
                      onChange={(ev) => handleChange(ev.target.value)}
                    />
                  )}
                  {endIconId && (
                    <InputIconWrapper css={lastIconStyles} isDisabled={disabled}>
                      <IconSprite icon={endIconId} />
                    </InputIconWrapper>
                  )}
                </InputWrapper>
                {(supportLabel || onValidLabel || error) && (
                  <SupportLabelComp
                    id={onValidLabel || error ? 'on-valid-label' : 'support-label'}
                    htmlFor={id}
                    isDisabled={disabled}
                  >
                    {supportLabel || onValidLabel}
                  </SupportLabelComp>
                )}
                {error && <ErrorText>{error.message}</ErrorText>}
              </div>
            )}
          </ClassNames>
        );
      }}
    />
  );
}
