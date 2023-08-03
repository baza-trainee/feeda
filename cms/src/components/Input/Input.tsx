import { inputStyles, labelStyles } from './Input.styles';

type InputProps = {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
  inputCss?: object;
  labelCss?: object;
};

export function Input({
  placeholder,
  type,
  value,
  onChange,
  name,
  id,
  label,
  disabled,
  inputCss,
  labelCss,
}: InputProps) {
  return (
    <>
      {label && (
        <label css={[labelStyles, labelCss]} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        css={[inputStyles, inputCss]}
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
}
