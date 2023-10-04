'use client';

import DatePicker, { registerLocale } from 'react-datepicker';
import { Control, Controller, FieldValues, UseFormTrigger } from 'react-hook-form';

import { ClassNames } from '@emotion/react';
import uk_UA from 'date-fns/locale/uk';
import { usePathname } from 'next/navigation';

import { useAppSelector } from '~/src/redux/hooks';
import { StoreTypes } from '~/src/redux/store/store';

import { Button } from '../Button/Button';
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
  control: Control;
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
  onclick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  submitBtn?: boolean;
  pattern?: string;
  begIconId?: IconType | undefined;
  endIconId?: IconType | undefined;
  rules?: object;
  trigger?: UseFormTrigger<FieldValues>;
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
  submitBtn,
  trigger,
}: InputProps) {
  registerLocale('uk_UA', uk_UA);
  const path = usePathname();
  const { email } = useAppSelector((state: StoreTypes) => state.auth);
  const { pass } = useAppSelector((state: StoreTypes) => state.auth);

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const valueLen = typeof value === 'string' ? value.length : 0;
        return (
          <ClassNames>
            {({ css }) => (
              <div id="input-wrapper" style={{ position: 'relative' }} onClick={onclick}>
                {label && (
                  <LabelComp
                    htmlFor={id}
                    inputValueLen={Boolean(valueLen)}
                    isDisabled={disabled}
                    checkIsValid={Boolean(pattern && valueLen)}
                    isError={Boolean(error)}
                  >
                    {label}
                  </LabelComp>
                )}
                <InputWrapper
                  checkIsValid={Boolean(pattern && valueLen)}
                  begIcon={Boolean(begIconId)}
                  endIcon={Boolean(endIconId)}
                  isError={Boolean(error)}
                >
                  {begIconId && (
                    <InputIconWrapper css={firstIconStyles} isDisabled={disabled}>
                      <IconSprite icon={begIconId} />
                    </InputIconWrapper>
                  )}
                  {type === 'date' ? (
                    <DatePicker
                      value={value}
                      todayButton="Сьогодні"
                      dateFormat="dd MMMM yyyy"
                      locale="uk_UA"
                      placeholderText={placeholder}
                      selected={value ? new Date(value as string) : undefined}
                      className={css(inputStyles)}
                      readOnly={readonly}
                      calendarStartDay={1}
                      onChange={onChange}
                      disabled={disabled}
                      onBlur={() => {
                        if (trigger) {
                          trigger(name);
                        }
                      }}
                    />
                  ) : (
                    <InputComp
                      begIcon={Boolean(begIconId)}
                      endIcon={Boolean(endIconId)}
                      id={id}
                      placeholder={placeholder}
                      readOnly={readonly}
                      type={type}
                      disabled={disabled}
                      required={required}
                      maxLength={maxLength}
                      minLength={minLength}
                      pattern={pattern}
                      defaultValue={
                        path === '/login' && name === 'email' && email
                          ? email
                          : path === '/login' && name === 'password' && pass
                          ? pass
                          : (value as string)
                      }
                      onChange={onChange}
                      value={value}
                      onBlur={() => {
                        if (trigger) {
                          trigger(name);
                        }
                      }}
                    />
                  )}
                  {submitBtn && endIconId ? (
                    <Button variant="text" btnType="submit" icon={endIconId} />
                  ) : (
                    endIconId && (
                      <InputIconWrapper css={lastIconStyles} isDisabled={disabled}>
                        <IconSprite icon={endIconId} />
                      </InputIconWrapper>
                    )
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
