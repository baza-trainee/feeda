'use client';

import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';

import { DropdownIndicator } from '../DropdownIndicator/DropdownIndicator';
import { ErrorText, Label, selectStyles } from './SelectField.style';

interface OptionType {
  label: JSX.Element;
  value: string | number;
}

interface CustomSelectProps {
  control: Control;
  name: string;
  rules?: object;
  options: OptionType[];
  placeholder: string | JSX.Element;
  clearErrors: (name?: string | string[]) => void;
  title: string;
  isSearchable?: boolean;
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
  isSearchable = false,
  isDisabled = false,
}: CustomSelectProps) => {
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
                ///////////////// fetch logic
                onInputChange={(value) => {
                  console.log(value);
                }}
                /////////////////
                isDisabled={isDisabled}
                components={{ DropdownIndicator }}
                instanceId={name}
                isSearchable={isSearchable}
                styles={selectStyles(!!error, isDropdownOpen, false)}
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
