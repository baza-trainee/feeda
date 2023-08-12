'use client';

import { useForm } from 'react-hook-form';

import { Button } from '../Button/Button';
import { Input } from './Input';

export function InputTester() {
  const { control, clearErrors, getValues } = useForm();
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // const form = ev.target as HTMLFormElement;
    // console.log(form.test.value);
    console.log(getValues());
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div style={{ width: '500px', margin: '0 auto' }}> */}
        {/* Обгортка для инпута, на нього вже можно прописувати стилі*/}
        <Input
          placeholder="placeholder"
          type="text"
          // readonly={true}
          // defaultValue={'standart text inside...'}
          name="test"
          id="test"
          control={control}
          clearErrors={clearErrors}
          // label="label"
          // supportLabel="supportLabel"
          // pattern="[0-9]{1,10}"
          // disabled={true}
          // begIconId="pencil"
          // endIconId="arrowDown"
        />
        {/* </div> */}
        <Button variant="text" btnType="submit" title="Submit" />
      </form>
    </div>
  );
}
