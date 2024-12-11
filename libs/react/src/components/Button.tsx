import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { Color } from '../style';
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
}

const ButtonColors: { [key in Color]: string } = {
  default:
    'bg-white text-black hover:bg-gray-100 focus-visible:ring-gray-300 border border-black active:bg-gray-200',
  yellow:
    'bg-yellow-400 text-white hover:bg-yellow-500 focus-visible:ring-yellow-400 active:bg-yellow-600',
  red: 'bg-red-400 text-white hover:bg-red-500 focus-visible:ring-red-400 active:bg-red-600',
  blue: 'bg-blue-400 text-white hover:bg-blue-500 focus-visible:ring-blue-400 active:bg-blue-600',
  green:
    'bg-green-400 text-white hover:bg-green-500 focus-visible:ring-green-400 active:bg-green-600',
  none: '',
};

export function Button({
  color = 'default',
  className = '',
  children,
  disabled,
  ...btnProps
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        'rounded-md inline-flex items-center justify-center py-2 text-sm font-medium px-2', ButtonColors[color],
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-opacity-50',
        className
      )}
      disabled={disabled}
      {...btnProps}
    >
      {children}
    </button>
  );
}

export default Button;
