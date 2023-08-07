// 'use client';

import { useRef, useState } from 'react';

import { IconSprite } from '../IconSprite/IconSprite';
import {
  DropdownItem,
  DropdownList,
  InputComp,
  InputIconWrapper,
  InputWrapper,
  LabelComp,
  MainWrapper,
  SupportLabelComp,
} from './Input.styles';

type InputProps = {
  placeholder?: string;
  type?: string;
  value: string;
  // onInputFunc: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputFunc: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  dropdownList?: string[];
  name?: string;
  className?: string;
  id?: string;
  label?: string;
  supportLabel?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  inputCss?: object[];
  labelCss?: object[];
  supportLabelCss?: object[];
  begIconId?: string;
  endIconId?: string;
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
  required,
  minLength,
  maxLength,
  pattern,
  begIconId,
  endIconId,
  inputCss,
  labelCss,
  supportLabelCss,
  dropdownList,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listMarkup = dropdownList
    ?.filter((item) => item.includes(value))
    .map((item) => (
      <DropdownItem
        key={item}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.value = item;
          }
        }}
      >
        {item}
      </DropdownItem>
    ));
  return (
    <MainWrapper>
      {label && (
        <LabelComp
          css={labelCss}
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
          <InputIconWrapper isDisabled={disabled}>
            <IconSprite icon={begIconId} />
          </InputIconWrapper>
        )}
        <InputComp
          id={id}
          css={inputCss}
          placeholder={placeholder}
          type={type || 'text'}
          value={value}
          name={name}
          onInput={onInputFunc}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          ref={inputRef}
        />
        {endIconId && (
          <InputIconWrapper isDisabled={disabled}>
            <IconSprite icon={endIconId} />
          </InputIconWrapper>
        )}
        {dropdownList && <DropdownList>{listMarkup}</DropdownList>}
      </InputWrapper>
      {supportLabel && (
        <SupportLabelComp css={supportLabelCss} htmlFor={id} isDisabled={disabled} pattern={pattern}>
          {supportLabel}
        </SupportLabelComp>
      )}
    </MainWrapper>
  );
}
