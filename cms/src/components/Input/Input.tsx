// 'use client';

import { useEffect, useRef, useState } from 'react';

import { IconSprite, IconType } from '../IconSprite/IconSprite';
import { DropdownMarkup } from './DropdownMarkup';
import {
  DropdownItem,
  DropdownList,
  InputComp,
  InputIconWrapper,
  InputWrapper,
  LabelComp,
  MainWrapper,
  NonStdInput,
  NonStdInputIconWrapper,
  SupportLabelComp,
} from './Input.styles';

type InputProps = {
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  // onInputFunc: (e: string) => void;
  name: string;
  id?: string;
  label?: string;
  supportLabel?: string;
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
  // onInputFunc,
  name,
  id,
  label,
  supportLabel,
  disabled = false,
  required,
  minLength,
  maxLength,
  pattern,
  begIconId,
  endIconId,
  dropdownList,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(defaultValue);
  // useEffect(() => {
  //   inputRef.current && (inputRef.current.value = inputValue);
  // }, [inputValue]);
  // console.log(inputValue);
  console.log('Input rerender');
  // const setInputValueHook = (value: string) => {
  //   dropdownList && setInputValue(value);
  // };
  return (
    <MainWrapper>
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
              // defaultValue={defaultValue}
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
        ) : type === 'role' ? (
          <></>
        ) : type === 'status' ? (
          <></>
        ) : (
          <InputComp
            id={id}
            placeholder={placeholder}
            type={type || 'text'}
            name={name}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            dropdownList={Boolean(dropdownList)}
            onChange={dropdownList ? (ev) => setInputValue(ev.target.value) : undefined}
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
    </MainWrapper>
  );
}
