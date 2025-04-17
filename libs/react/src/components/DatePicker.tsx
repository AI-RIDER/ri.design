import * as PopoverPrimitive from '@radix-ui/react-popover';
import { useMemo, useState } from 'react';
import * as DayPickerPrimitive from 'react-day-picker';
import { twMerge } from 'tailwind-merge';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import Button from './Button';

import { format, parse, setYear } from 'date-fns';
import { zhTW } from 'date-fns/locale';

export type DatePickerProps = Omit<DayPickerPrimitive.DayPickerProps, 'mode' | 'classNames'> & {
  locale?: DayPickerPrimitive.Locale;
  className?: string;
  selected?: Date;
  mode?: DayPickerPrimitive.Mode;
  onChange?: (selected: Date) => void;
  time?: boolean;
  min?: Date,
  max?: Date,
  format?: string,
  nav?: boolean,
  classNames?: {
    calendar: string
  }
};

// 生成年份選項，預設前後 50 年
const generateYearOptions = (currentYear: number) => {
  const years = [];
  for (let i = currentYear - 50; i <= currentYear + 50; i++) {
    years.push(i);
  }
  return years;
};

export function DatePicker({
  className,
  selected,
  onChange,
  locale = zhTW,
  classNames,
  mode,
  time,
  min,
  max,
  nav,
  ...props
}: DatePickerProps) {
  const [dateState, setDateState] = useState(selected || new Date());
  const [open, setOpen] = useState(false);

  const handleDaySelect = (selected: Date | undefined) => {
    if(selected) {
      setDateState(selected);
      onChange && onChange(selected);
    }
  };

  const selectedDate = selected || dateState;
  const yearOptions = generateYearOptions(new Date().getFullYear());

  const handleTimeChange = (time: string) => {
    const d = parse(time, 'HH:mm:ss', selectedDate);
    setDateState(d);
    console.log(d)
    onChange && onChange(d);
  }

  const formatted = useMemo(() => {
    let f = props.format || 'yyyy/MM/dd HH:mm:ss';

    if (time) {
      return format(selectedDate, f);
    }

    f = props.format || 'yyyy/MM/dd';
    f = f.replace(/[Hms:]/g, '');

    return format(selectedDate, f);
  }, [selectedDate, time, props.format]);


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
            'rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=top]:animate-slideDownAndFade',
            classNames?.calendar ?? ''
          )}
          sideOffset={5}
        >
          <div className="flex mb-[32px]">
            <div>


              <DayPickerPrimitive.DayPicker
                mode="single"
                captionLayout='dropdown-years'
                selected={selectedDate}
                onSelect={handleDaySelect}
                defaultMonth={selectedDate}
                locale={locale}
                endMonth={new Date(2099, 11, 31)}
                classNames={{
                  day: '',
                  selected: 'rounded-full bg-blue-400 text-white',
                  day_button: 'w-10 h-10',
                  months: '',
                  month_caption: (nav === false) ? 'hidden' : 'h-10',
                  caption_label: 'hidden',
                  nav: (nav === false) ? 'hidden' : 'absolute right-6',
                  chevron: 'fill-blue-500',
                  disabled: 'text-gray-300'
                }}
                disabled={{
                  before: min,
                  after: max,
                } as DayPickerPrimitive.Matcher}
            //     components={{
            //       DropdownNav: ({ ...props }) => {
            //         return (
            //           <div className='flex gap-1 items-center'>
            //             {props.children}
            //           </div>
            //         )
            //       },
            //       YearsDropdown: ({ ...props }) => {
            //         const { value } = props;
            //         return (
            //   <div>
            //   <SelectPrimitive.Root
            //     value={value?.toString()}
            //     onValueChange={(v) => {
            //       if (props.onChange) {
            //         const newDate = setYear(selectedDate, parseInt(v));
            //         setDateState(newDate);
            //         console.log(newDate)
            //         onChange && onChange(newDate);
            //         const event = { target: { value: v } } as React.ChangeEvent<HTMLSelectElement>;
            //         props.onChange(event);
            //       }
            //     }}
            //   >
            //     <SelectPrimitive.Trigger
            //       className="inline-flex h-8 items-center justify-center gap-1 rounded bg-white px-3 text-sm leading-none text-gray-800 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-gray-50 focus:shadow-[0_0_0_2px] focus:shadow-black"
            //     >
            //       <SelectPrimitive.Value />
            //       <SelectPrimitive.Icon>
            //         <ChevronDownIcon />
            //       </SelectPrimitive.Icon>
            //     </SelectPrimitive.Trigger>

            //     <SelectPrimitive.Portal>
            //       <SelectPrimitive.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
            //         <SelectPrimitive.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-700">
            //           <ChevronDownIcon className="rotate-180" />
            //         </SelectPrimitive.ScrollUpButton>
            //         <SelectPrimitive.Viewport className="p-1">
            //           {yearOptions.map((year) => (
            //             <SelectPrimitive.Item
            //               key={year}
            //               value={year.toString()}
            //               className="relative flex h-[25px] select-none items-center rounded-[3px] px-[35px] pl-[25px] pr-[35px] text-sm leading-none text-gray-700 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-400 data-[highlighted]:text-white data-[highlighted]:outline-none"
            //             >
            //               <SelectPrimitive.ItemText>{year}</SelectPrimitive.ItemText>
            //             </SelectPrimitive.Item>
            //           ))}
            //         </SelectPrimitive.Viewport>
            //         <SelectPrimitive.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-gray-700">
            //           <ChevronDownIcon />
            //         </SelectPrimitive.ScrollDownButton>
            //       </SelectPrimitive.Content>
            //     </SelectPrimitive.Portal>
            //   </SelectPrimitive.Root>
            // </div>
            //         )
            //       }
            //     }}
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

    const t = [h, m, s].join(':');

    setState(t)
    onChange && onChange(t);
  };

  const times = time.split(':');

  return (
    <div className="flex">
      <div>
        <div className="text-center">時</div>
        <ScrollAreaPrimitive.Root className="rounded bg-white">
          <ScrollAreaPrimitive.Viewport className="size-full h-[240px] w-[44px] overflow-hidden rounded">
            <div className="px-1 py-[2px]">
              {HOURS.map((h) => {
                const v = (h + '').padStart(2, '0');
                const selected = v === times[0];

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
        <ScrollAreaPrimitive.Root className="rounded bg-white">
          <ScrollAreaPrimitive.Viewport className="size-full h-[240px] w-[44px] overflow-hidden rounded">
            <div className="px-1 py-[2px]">
              {MINUTES.map((h) => {
                const v = (h + '').padStart(2, '0');
                const selected = v === times[1];

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
        <ScrollAreaPrimitive.Root className="rounded bg-white">
          <ScrollAreaPrimitive.Viewport className="size-full h-[240px] w-[44px] overflow-hidden rounded">
            <div className="px-1 py-[2px]">
              {SECONDS.map((h) => {
                const v = (h + '').padStart(2, '0');
                const selected = v === times[2];

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
