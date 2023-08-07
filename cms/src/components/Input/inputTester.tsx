'use client';

import { useState } from 'react';

import { Input } from './Input';

export function InputTester() {
  // const [inputValue, setInputValue] = useState('standart text inside...');
  const [inputValue, setInputValue] = useState('');
  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <Input
        placeholder="placeholder"
        type="text"
        value={inputValue}
        name="test"
        id="test"
        // label="label"
        // supportLabel="supportLabel"
        // pattern="[0-9]{1,10}"
        // // disabled={true}
        // begIconId="pencil"
        // endIconId="arrowDown"
        onInputFunc={setInputValue}
        dropdownList={[
          'one',
          'two',
          'three',
          'Vasya Pupkin',
          'Taras Bulba',
          'Homer Simpson',
          'X',
          'Elon Musk',
          'Bill Gates',
          'Steve Jobs',
          'Mark Zuckerberg',
          'Very very very very very very long name...',
        ]}
      />
    </div>
  );
}
