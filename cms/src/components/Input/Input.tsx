// 'use client';

import { useEffect, useState } from 'react';

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
  value: string;
  onInputFunc: (e: string) => void;
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
  value,
  onInputFunc,
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
  // const drop
  return (
    <MainWrapper>
      {label && (
        <LabelComp
          htmlFor={id}
          inputValueLen={value.length}
          isDisabled={disabled}
          checkIsValid={Boolean(pattern && value?.length)}
        >
          {label}
        </LabelComp>
      )}
      <InputWrapper
        checkIsValid={Boolean(pattern && value?.length)}
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
              value={value}
              name={name}
              readOnly={true}
              // onInput={(ev) => onInputFunc((ev.target as HTMLInputElement).value)}
              disabled={disabled}
              required={required}
              dropdownList={Boolean(dropdownList)}
            />
            <NonStdInput style={{ display: value ? 'flex' : 'none' }}>
              {[1, 2, 3, 4, 5].map((item) => (
                <NonStdInputIconWrapper key={item}>
                  <IconSprite icon={item.toString() <= value.toString() ? 'complexityActive' : 'complexityInactive'} />
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
            value={value}
            name={name}
            onInput={(ev) => onInputFunc((ev.target as HTMLInputElement).value)}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            dropdownList={Boolean(dropdownList)}
          />
        )}

        {endIconId && (
          <InputIconWrapper style={{ paddingLeft: 12 }} isDisabled={disabled}>
            <IconSprite icon={endIconId} />
          </InputIconWrapper>
        )}
        {dropdownList && (
          <DropdownList>
            <DropdownMarkup type={type || 'text'} onInputFunc={onInputFunc} dropdownList={dropdownList} value={value} />
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
