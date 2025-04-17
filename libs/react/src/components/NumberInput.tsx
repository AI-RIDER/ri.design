import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumberInput({
  value,
  onChange,
  className,
  min,
  max,
  step = 1,
  ...elementProps
}: NumberInputProps) {
  const handleIncrease = () => {
    if (max !== undefined && value + step > max) return;
    onChange(value + step);
  };

  const handleDecrease = () => {
    if (min !== undefined && value - step < min) return;
    onChange(value - step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    if (min !== undefined && newValue < min) return;
    if (max !== undefined && newValue > max) return;

    onChange(newValue);
  };

  return (
    <div className="relative flex">
      <input
        type="number"
        value={value}
        onChange={handleChange}
        className={twMerge(
          'h-8 w-full rounded-lg border border-[#DEDEDE] bg-white px-4 pr-8',
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        min={min}
        max={max}
        step={step}
        {...elementProps}
      />
      <div className="absolute right-1 top-0 flex h-full flex-col justify-center">
        <button
          type="button"
          onClick={handleIncrease}
          className="flex h-4 w-4 items-center justify-center rounded hover:bg-gray-100"
          tabIndex={-1}
        >
          <svg
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 0L7.4641 4H0.535898L4 0Z" fill="#666666" />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleDecrease}
          className="flex h-4 w-4 items-center justify-center rounded hover:bg-gray-100"
          tabIndex={-1}
        >
          <svg
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4L0.535898 0L7.4641 0L4 4Z" fill="#666666" />
          </svg>
        </button>
      </div>
    </div>
  );
}
