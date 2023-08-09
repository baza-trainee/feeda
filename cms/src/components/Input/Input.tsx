// 'use client';

import { useState } from 'react';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { DropdownMarkup, listContent } from './DropdownMarkup';
import {
  DropdownList,
  InputComp,
  InputIconWrapper,
  InputWrapper,
  LabelComp,
  NonStdInput,
  NonStdInputIconWrapper,
  SupportLabelComp,
} from './Input.styles';

type InputProps = {
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  name: string;
  id?: string;
  label?: string;
  supportLabel?: string;
  readonly?: boolean;
  disabled?: boolean | undefined;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  begIconId?: IconType | undefined;
  endIconId?: IconType | undefined;
  dropdownList?: string[];
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
  dropdownList,
}: InputProps) {
  const [inputValue, setInputValue] = useState(defaultValue);
  console.log('Input rerender');
  if (type === 'role' || type === 'status') {
    const icon = listContent[type].find((item) => item.name === inputValue)?.icon;
    icon && (begIconId = icon);
  }
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
      <InputWrapper
        checkIsValid={Boolean(pattern && inputValue.length)}
        dropdownList={Boolean(dropdownList)}
        endIconId={Boolean(endIconId)}
      >
        {begIconId && (
          <InputIconWrapper style={{ paddingRight: 12 }} isDisabled={disabled}>
            <IconSprite icon={begIconId} />
          </InputIconWrapper>
        )}
        {type === 'complexity' ? (
          <>
            <InputComp
              id={id}
              placeholder="Важкість проєкту"
              type="text"
              name={name}
              readOnly={true}
              disabled={disabled}
              required={required}
              dropdownList={Boolean(dropdownList)}
              value={inputValue}
              style={{ color: 'transparent' }}
            />
            <NonStdInput style={{ display: inputValue ? 'flex' : 'none' }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <NonStdInputIconWrapper key={item}>
                  <IconSprite
                    icon={item.toString() <= inputValue.toString() ? 'complexityActive' : 'complexityInactive'}
                  />
                </NonStdInputIconWrapper>
              ))}
            </NonStdInput>
          </>
        ) : (
          <InputComp
            id={id}
            placeholder={placeholder}
            readOnly={readonly}
            type={(type === 'role' && 'text') || (type === 'status' && 'text') || type || 'text'}
            name={name}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            dropdownList={Boolean(dropdownList)}
            onChange={dropdownList || pattern ? (ev) => setInputValue(ev.target.value) : undefined}
            value={dropdownList ? inputValue : undefined}
            defaultValue={dropdownList ? undefined : defaultValue}
          />
        )}

        {endIconId && (
          <InputIconWrapper style={{ paddingLeft: 12 }} isDisabled={disabled}>
            <IconSprite icon={endIconId} />
          </InputIconWrapper>
        )}
        {dropdownList && (
          <DropdownList>
            <DropdownMarkup
              type={type || 'text'}
              onInputFunc={setInputValue}
              dropdownList={dropdownList}
              value={inputValue}
            />
          </DropdownList>
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
