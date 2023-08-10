'use client';

/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Label } from './SelectField.style';
import { ErrorText } from './SelectField.style';

import Select from 'react-select';
import { SelectIconWrapper, SelectItem, SelectItemIcon, SelectText, SelectItemIconType } from './SelectField.style';
import { DropdownIndicator } from '../DropdownIndicator/DropdownIndicator';
import { selectStyles } from './SelectField.style';

export const ProjectState = ({ type, title }: { type: SelectItemIconType; title: string }) => {
  return (
    <SelectItem>
      <SelectIconWrapper>
        <SelectItemIcon type={type} />
      </SelectIconWrapper>
      <SelectText>{title}</SelectText>
    </SelectItem>
  );
};

interface OptionType {
  label: JSX.Element;
  value: string;
}

interface CustomSelectProps {
  control: Control;
  name: string;
  rules?: object;
  options: OptionType[];
  placeholder: string | JSX.Element;
  clearErrors: (name?: string | string[]) => void;
  valueGetter: (value: string) => OptionType | undefined | string;
  title: string;
  defaultValue: string;
}

export const CustomSelect = ({
  control,
  name,
  rules,
  options,
  placeholder,
  clearErrors,
  valueGetter,
  title,
  defaultValue,
}: CustomSelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Controller
      defaultValue={defaultValue}
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => {
        const handleSelectChange = () => {
          clearErrors(name);
        };

        const computedValue = typeof valueGetter === 'function' ? valueGetter(value) : value;

        return (
          <div style={{ position: 'relative' }}>
            <Label>
              {title}
              <Select
                isDisabled={false}
                components={{ DropdownIndicator }}
                instanceId={name}
                isSearchable={false}
                styles={selectStyles(!!error, isDropdownOpen, false)}
                placeholder={placeholder}
                options={options}
                value={computedValue}
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
