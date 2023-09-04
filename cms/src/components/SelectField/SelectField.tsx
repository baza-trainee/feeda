'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import { DropdownIndicator } from '../DropdownIndicator/DropdownIndicator';
import { ErrorText, Label, selectStyles } from './SelectField.style';

export interface OptionType {
  label: JSX.Element | string;
  value?: string | number;
  id?: number;
}

interface SelectFieldProps {
  control: Control;
  name: string;
  rules?: object;
  options: OptionType[];
  placeholder: string | JSX.Element;
  clearErrors: (name?: string | string[]) => void;
  title: string;
  isDisabled?: boolean;
  valueGetter?: (value: string) => OptionType | undefined | string;
}

export const SelectField = ({
  control,
  name,
  rules,
  options,
  placeholder,
  clearErrors,
  title,
  isDisabled = false,
  valueGetter,
}: SelectFieldProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
        const handleSelectChange = () => {
          clearErrors(name);
        };

        const computedValue = typeof valueGetter === 'function' ? valueGetter(value) : value;

        return (
          <div style={{ position: 'relative' }} id="input-wrapper">
            <Label>
              {title}
              <Select
                isSearchable={false}
                isDisabled={isDisabled}
                components={{ DropdownIndicator }}
                instanceId={name}
                styles={selectStyles(!!error, isDropdownOpen, isDisabled)}
                placeholder={placeholder}
                options={options}
                value={computedValue}
                onChange={(selectedOption: OptionType) => {
                  console.log('selectedOption', selectedOption);
                  setIsDropdownOpen(false);
                  onChange(selectedOption.value);
                  handleSelectChange();
                }}
                onMenuOpen={() => setIsDropdownOpen(true)}
                onMenuClose={() => setIsDropdownOpen(false)}
                onBlur={() => {
                  setIsDropdownOpen(false);
                  onBlur();
                }}
              />
            </Label>
            {error && <ErrorText>{error.message}</ErrorText>}
          </div>
        );
      }}
    />
  );
};

interface AsyncFieldProps {
  control: Control;
  name: string;
  rules?: object;
  options: (inputValue: string) => Promise<{ value: string; label: string }[]>;
  placeholder: string | JSX.Element;
  clearErrors: (name?: string | string[]) => void;
  title: string;
  isDisabled?: boolean;
}

export const AsyncField = ({
  control,
  name,
  rules,
  options,
  placeholder,
  clearErrors,
  title,
  isDisabled = false,
}: AsyncFieldProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
        const handleSelectChange = (selectedOption: OptionType) => {
          clearErrors(name);
          setIsDropdownOpen(false);
          onChange(selectedOption);
        };
        return (
          <div style={{ position: 'relative' }} id="input-wrapper">
            <Label>
              {title}
              <AsyncSelect
                components={{ DropdownIndicator }}
                instanceId={name}
                styles={selectStyles(!!error, isDropdownOpen, isDisabled)}
                placeholder={placeholder}
                loadOptions={options}
                value={value}
                isDisabled={isDisabled}
                onChange={handleSelectChange}
                onMenuOpen={() => setIsDropdownOpen(true)}
                onMenuClose={() => setIsDropdownOpen(false)}
                onBlur={() => {
                  setIsDropdownOpen(false);
                  onBlur();
                }}
              />
            </Label>
            {error && <ErrorText>{error.message}</ErrorText>}
          </div>
        );
      }}
    />
  );
};
