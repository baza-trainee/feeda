'use client';

import { css } from '@emotion/react';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Label } from './SelectField.style';
import { ErrorText } from './SelectField.style';

import Select from 'react-select';
import {
  SelectIconWrapper,
  SelectItem,
  SelectStateIcon,
  SelectText,
  SelectStateIconType,
  SelectRoleIcon,
  SelectRoleIconType,
  SelectDifficulty,
  SelectDifficultyIcon,
  SelectDifficultyType,
} from './SelectField.style';
import { DropdownIndicator } from '../DropdownIndicator/DropdownIndicator';
import { selectStyles } from './SelectField.style';

export const ProjectState = ({ type, title }: { type: SelectStateIconType; title: string }) => {
  return (
    <SelectItem>
      <SelectIconWrapper>
        <SelectStateIcon type={type} />
      </SelectIconWrapper>
      <SelectText>{title}</SelectText>
    </SelectItem>
  );
};

export const MemberRole = ({ type, title }: { type: SelectRoleIconType; title: string }) => {
  return (
    <SelectItem>
      <SelectIconWrapper>
        <SelectRoleIcon type={type} />
      </SelectIconWrapper>
      <SelectText>{title}</SelectText>
    </SelectItem>
  );
};

export const ProjectDifficulty = ({ type }: { type: SelectDifficultyType }) => {
  return (
    <SelectDifficulty>
      {[1, 2, 3, 4, 5].map((item) => (
        <SelectDifficultyIcon key={item} type={type} />
      ))}
    </SelectDifficulty>
  );
};

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
  valueGetter: (value: string) => OptionType | undefined | string;
  title: string;
  defaultValue: string | number;
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
