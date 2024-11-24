import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export default function Input({
  value = '',
  onChange,
  className,
  ...elementProps
}: InputProps) {
  return (
    <input
      type='text'
      value={value}
      className={twMerge('h-8 w-full rounded-lg border border-[#DEDEDE] bg-white px-4', className)}
      onChange={e => {
        onChange(e.target.value);
      }}
      {...elementProps}
    />
  );
}
