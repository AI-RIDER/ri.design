import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { FC, ReactNode } from 'react';

export interface DialogProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  close?: ReactNode | false;
}

function Dialog({ children, open, onOpenChange, close }: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-opacity-60 bg-gray-200 data-[state=open]:animate-ri_OverlayShow" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-ri_ContentShow">
          {children}

          {typeof close !== 'boolean' &&
            (close || (
              <Dialog.Close asChild>
                <button
                  className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            ))}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

interface Dialog extends FC<DialogProps> {
  Title: typeof DialogPrimitive.Title;
  Description: typeof DialogPrimitive.Description;
  Close: typeof DialogPrimitive.Close;
}

Dialog.Title = DialogPrimitive.Title;
Dialog.Description = DialogPrimitive.Description;
Dialog.Close = DialogPrimitive.Close;

export default Dialog as Dialog;
