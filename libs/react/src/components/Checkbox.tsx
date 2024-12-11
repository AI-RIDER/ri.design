import { useState } from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';

import { twMerge } from 'tailwind-merge';

import { Color } from '../style';

const CheckboxColorTheme: { [key in Color]: string } = {
  default: 'border hover:bg-gray-50',
  yellow:
    'border hover:bg-yellow-50 data-[state=checked]:bg-yellow-400 data-[state=indeterminate]:bg-yellow-400',
  red: 'border hover:bg-red-50 data-[state=checked]:bg-red-400 data-[state=indeterminate]:bg-red-400',
  blue: 'border hover:bg-blue-50 data-[state=checked]:bg-blue-400 data-[state=indeterminate]:bg-blue-400',
  green:
    'border hover:bg-green-50 data-[state=checked]:bg-green-400 data-[state=indeterminate]:bg-green-400',
  none: 'border',
};

const IndicatorColorTheme: { [key in Color]: string } = {
  default: 'text-black',
  yellow: 'text-white',
  red: 'text-white',
  blue: 'text-white',
  green: 'text-white',
  none: '',
};

export interface CheckboxProps
  extends Omit<CheckboxPrimitive.CheckboxProps, 'onChange'> {
  checked?: CheckboxPrimitive.CheckedState;
  onChange?: (checked: boolean) => void;
  color?: Color;
}

export default function Checkbox({
  checked,
  onChange,
  className = '',
  color = 'default'
}: CheckboxProps) {
  const [state, setState] = useState<CheckboxPrimitive.CheckedState>(
    checked ?? false
  );

  const renderState = checked == undefined ? state : checked;

  return (
    <CheckboxPrimitive.Root
      className={twMerge(
        'flex size-[22px] appearance-none items-center justify-center rounded hover:bg-violet3 bg-white',
        CheckboxColorTheme[color],
        className
      )}
      checked={renderState}
      onCheckedChange={(s) => {
        setState(s);

        onChange && onChange(!!s);
      }}
    >
      <CheckboxPrimitive.Indicator className="text-violet12">
        {(checked ?? state) === 'indeterminate' ? (
          <DividerHorizontalIcon
            className={twMerge('size-4', IndicatorColorTheme[color])}
          />
        ) : (
          <CheckIcon
            className={twMerge('size-4', IndicatorColorTheme[color])}
          />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
