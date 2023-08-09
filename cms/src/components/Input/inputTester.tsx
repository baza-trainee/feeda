'use client';

import { Button } from '../Button/Button';
import { Input } from './Input';

export function InputTester() {
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    console.log(form.test.value);
  };
  return (
    <div style={{ width: '300px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="placeholder"
          type="text"
          // type="complexity"
          // type="role"
          // defaultValue={'standart text inside...'}
          name="test"
          id="test"
          label="label"
          supportLabel="supportLabel"
          // pattern="[0-9]{1,10}"
          // disabled={true}
          begIconId="pencil"
          endIconId="arrowDown"
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
        <Button variant="text" btnType="submit" title="Submit" />
      </form>
    </div>
  );
}
