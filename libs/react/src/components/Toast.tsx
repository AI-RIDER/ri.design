import { ReactNode, useEffect, useRef, useState } from 'react';

import * as ToastPrimitive from '@radix-ui/react-toast';


export type ToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  open?: boolean,
  onOpenChange?: (open: boolean) => void
} & Partial<Pick<ToastPrimitive.ToastProviderProps, 'duration' | 'swipeDirection' | 'swipeThreshold'>>

function Toast({ title, description, duration, action, swipeDirection, swipeThreshold, open, onOpenChange }: ToastProps) {
  return (
    <ToastPrimitive.Provider duration={duration} swipeDirection={swipeDirection} swipeThreshold={swipeThreshold}>
      <ToastPrimitive.Root
        className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
        open={open}
        onOpenChange={onOpenChange}
      >
        <ToastPrimitive.Title className="mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]">
          {title}
        </ToastPrimitive.Title>
        <ToastPrimitive.Description asChild>
          {description}
        </ToastPrimitive.Description>

        {action && (
          <ToastPrimitive.Action
            className="[grid-area:_action]"
            asChild
            altText="Goto schedule to undo"
          >
            {action}
          </ToastPrimitive.Action>
        )}
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </ToastPrimitive.Provider>
  );
};

export default Toast;
