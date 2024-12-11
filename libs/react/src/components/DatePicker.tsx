import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useMemo, useState } from 'react';
import * as DayPickerPrimitive from 'react-day-picker';
import { twMerge } from 'tailwind-merge';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import Button from './Button';

import { format, parse } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export type DatePickerProps = Omit<DayPickerPrimitive.DayPickerProps, 'mode'> & {
  locale?: DayPickerPrimitive.Locale;
  className?: string;
  date?: Date;
  mode?: DayPickerPrimitive.Mode;
  onChange?: (date: Date) => void;
  time?: boolean;
};

export function DatePicker({
  className,
  date,
  onChange,
  locale = zhTW,
  classNames,
  mode,
  time,
  ...props
}: DatePickerProps) {
  const [dateState, setDateState] = useState(date || new Date());
  const [open, setOpen] = useState(false);

  const handleDaySelect = (date: Date | undefined) => {
    if(date) {
      setDateState(date);

      onChange && onChange(date);
    }
  };

  const selectedDate = date || dateState;

  const handleTimeChange = (time: string) => {
    let d = parse(time, 'HH:mm:ss', selectedDate);

    setDateState(d);

    onChange && onChange(d);
  }

  const formatted = useMemo(() => {
    if (time) {
      return format(selectedDate, 'yyyy/MM/dd HH:mm:ss');
    }

    return format(selectedDate, 'yyyy/MM/dd');
  }, [selectedDate, time]);

  return (
    <PopoverPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
      }}
    >
      <PopoverPrimitive.Trigger asChild>
        <button
          className={twMerge(
            'border-b text-gray-800 outline-none cursor-pointer',
            className
          )}
        >
          {formatted}
        </button>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={twMerge(
            'rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade'
          )}
          sideOffset={5}
        >
          <div className="flex mb-[32px]">
            <div>
              <DayPickerPrimitive.DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDaySelect}
                locale={locale}
                classNames={{
                  day: '',
                  selected: 'rounded-full bg-blue-400 text-white',
                  day_button: 'w-10 h-10',
                  months: '',
                  month_caption: 'h-10',
                  nav: 'absolute right-6',
                  chevron: 'fill-blue-500',
                  ...classNames,
                }}
                {...props}
              />
            </div>

            {time && (
              <div className="mt-[32px] border-l">
                <TimePicker
                  value={format(selectedDate, 'HH:mm:ss')}
                  onChange={handleTimeChange}
                />
              </div>
            )}

            <div className="absolute right-4 bottom-4">
              <Button
                color="blue"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                確定
              </Button>
            </div>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}

interface TimePickerProps {
  className?: string;
  value?: string;
  onChange?: (time: string) => void
}

const HOURS = new Array(24).fill(1).map((_, idx) => {
  return idx;
});

const MINUTES = new Array(60).fill(1).map((_, idx) => {
  return idx;
});

const SECONDS = new Array(60).fill(1).map((_, idx) => {
  return idx;
});

function TimePicker({ className, value, onChange }: TimePickerProps) {
  const [state, setState] = useState(value || '00:00:00');

  const time = value || state;

  const handleChange = (value: number, uint: 'h' | 'm' | 's') => {
    let [h, m, s] = time.split(':');

    switch (uint) {
      case 'h':
        h = (value + '').padStart(2, '0');
        break;
      case 'm':
        m = (value + '').padStart(2, '0');
        break;
      case 's':
        s = (value + '').padStart(2, '0');
        break;
    }

    let t = [h, m, s].join(':');

    setState(t)
    onChange && onChange(t);
  };

  const times = time.split(':');

  return (
    <div className="flex">
      <div>
        <div className="text-center">時</div>
        <ScrollAreaPrimitive.Root className="h-[240px] w-[44px] overflow-hidden rounded bg-white">
          <ScrollAreaPrimitive.Viewport className="size-full rounded">
            <div className="px-1 py-[2px]">
              {HOURS.map((h) => {
                let v = (h + '').padStart(2, '0');

                let selected = v === times[0];

                return (
                  <div
                    className={twMerge("border-t border-t-mauve6 py-[4px] text-[15px] leading-[18px] text-mauve12 cursor-pointer text-center")}
                    key={h}
                    onClick={() => handleChange(h, 'h')}
                  >
                    <div className={twMerge('py-[4px] rounded', selected? 'bg-blue-400 text-white' : '')}>
                      {v}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            {/* <ScrollAreaPrimitive.Thumb className="relative bg-slate-300 flex-1 rounded-[10px]" /> */}
          </ScrollAreaPrimitive.Scrollbar>
          <ScrollAreaPrimitive.Corner className="bg-blackA5" />
        </ScrollAreaPrimitive.Root>
      </div>

      <div>
        <div className="text-center">分</div>
        <ScrollAreaPrimitive.Root className="h-[240px] w-[44px] overflow-hidden rounded bg-white">
          <ScrollAreaPrimitive.Viewport className="size-full rounded">
            <div className="px-1 py-[2px]">
              {MINUTES.map((h) => {
                let v = (h + '').padStart(2, '0');

                let selected = v === times[1];

                return (
                  <div
                    className={twMerge("border-t border-t-mauve6 py-[4px] text-[15px] leading-[18px] text-mauve12 cursor-pointer text-center")}
                    key={h}
                    onClick={() => handleChange(h, 'm')}
                  >
                    <div className={twMerge('py-[4px] rounded', selected? 'bg-blue-400 text-white' : '')}>
                      {v}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            {/* <ScrollAreaPrimitive.Thumb className="relative bg-slate-300 flex-1 rounded-[10px]" /> */}
          </ScrollAreaPrimitive.Scrollbar>
          <ScrollAreaPrimitive.Corner className="bg-blackA5" />
        </ScrollAreaPrimitive.Root>
      </div>

      <div>
        <div className="text-center">秒</div>
        <ScrollAreaPrimitive.Root className="h-[240px] w-[44px] overflow-hidden rounded bg-white">
          <ScrollAreaPrimitive.Viewport className="size-full rounded">
            <div className="px-1 py-[2px]">
              {SECONDS.map((h) => {
                let v = (h + '').padStart(2, '0');

                let selected = v === times[2];

                return (
                  <div
                    className={twMerge("border-t border-t-mauve6 py-[4px] text-[15px] leading-[18px] text-mauve12 cursor-pointer text-center")}
                    key={h}
                    onClick={() => handleChange(h, 's')}
                  >
                    <div className={twMerge('py-[4px] rounded', selected? 'bg-blue-400 text-white' : '')}>
                      {v}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollAreaPrimitive.Viewport>
          <ScrollAreaPrimitive.Scrollbar
            className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
            orientation="vertical"
          >
            {/* <ScrollAreaPrimitive.Thumb className="relative bg-slate-300 flex-1 rounded-[10px]" /> */}
          </ScrollAreaPrimitive.Scrollbar>
          <ScrollAreaPrimitive.Corner className="bg-blackA5" />
        </ScrollAreaPrimitive.Root>
      </div>
    </div>
  );
}

export default DatePicker;
