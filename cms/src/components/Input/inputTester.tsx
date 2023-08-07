'use client';

import { useState } from 'react';

import { Input } from './Input';

export function InputTester() {
  // const [inputValue, setInputValue] = useState('standart text inside...');
  const [inputValue, setInputValue] = useState('');
  // console.log(inputValue.test(/^[0-9]{1,10}$/));
  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Input
        placeholder="placeholder"
        type="text"
        value={inputValue}
        name="test"
        id="test"
        label="label"
        supportLabel="supportLabel"
        pattern="[0-9]{1,10}"
        // disabled={true}
        dropdownList={[
          'one',
          'two',
          'three',
          'four',
          'five',
          'six',
          'seven',
          'eight',
          'nine',
          'ten',
          'eleven',
          'twelve',
        ]}
        begIconId="pencil"
        endIconId="arrowDown"
        onInputFunc={(ev) => setInputValue(ev.target.value)}
        //   inputCss
        //   labelCss,
        //   supportLabelCss,
      />
    </div>
  );
}
