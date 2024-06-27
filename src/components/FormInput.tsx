import { ChangeEvent, HTMLInputTypeAttribute } from 'react';

import '../styles/components/FormInput.css';

export type FormInputProps = {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string|number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

export function FormInput({
  label,
  type,
  placeholder,
  value,
  onChange,
  disabled
}: FormInputProps) {
  return (
    <div className="form-input-group">
      <label className="form-input-label">
        {label}
      </label>
      <input
        type={type ?? 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        disabled={disabled}/>
    </div>
  );
}
