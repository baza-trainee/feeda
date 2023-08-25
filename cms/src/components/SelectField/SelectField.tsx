'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';

import { DropdownIndicator } from '../DropdownIndicator/DropdownIndicator';
import { ErrorText, Label, selectStyles } from './SelectField.style';

export interface OptionType {
  label: JSX.Element | string;
  value: string | number;
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
                value={value}
                onChange={(selectedOption) => {
                  setIsDropdownOpen(false);
                  onChange(selectedOption);
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
