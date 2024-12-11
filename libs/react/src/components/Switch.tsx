import { ChangeEvent, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import * as SwtichPrimitive from '@radix-ui/react-switch';

export interface SwitchProps extends Omit<SwtichPrimitive.SwitchProps, 'onChange'> {
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ball =
  'peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all';
const track = 'peer-checked:bg-blue-600 w-11 h-6 bg-gray-200 rounded-full';

export default function Switch({
  className = '',
  checked,
  onChange,
  name,
  children
}: SwitchProps) {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label className='relative inline-flex cursor-pointer items-center'>
      <input
        type='checkbox'
        className='peer sr-only'
        checked={checked}
        onChange={handleOnChange}
        name={name}
      />
      <span className={twMerge(`${track} ${ball}`, className)} />
      {children}
    </label>
  );
}
