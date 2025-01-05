import { useCallback, useEffect, useMemo, useRef, ReactDOM, useState, ReactNode } from 'react';
import { createRoot } from 'react-dom/client'
import Dialog, { type DialogProps } from '../components/Dialog';

function getRootEl() {
  return document.querySelector('body');
}

const rootEl = getRootEl();

let dialogRootEl = document.createElement('div');
dialogRootEl.id = "__ri_dialog_root";

rootEl?.append(dialogRootEl);

const root = createRoot(dialogRootEl);

interface UseDialogProps {
  content?: ReactNode,
  close?: ReactNode
}

function useDialog(dialogProps?: UseDialogProps) {
  const { content, close } = dialogProps || {};

  const [open, setOpen] = useState(false);

  const [props, setProps] = useState<DialogProps>({
    open: false
  });

  useEffect(() => {
    const mix: DialogProps = {
      ...props,
      open,
      onOpenChange: (v: boolean) => {
        setOpen(v)
      },
      children: content,
      close: close
    }

    const dialogInstance = <Dialog {...mix}></Dialog>;

    root.render(dialogInstance);
  }, [props, open, setOpen, content, close])

  const exportOpen = useCallback((props?: DialogProps) => {
    if(!rootEl) {
      return;
    }

    setProps((prev) => {
      return {
        ...prev,
        ...props
      }
    });

    setOpen(true);
  }, [setProps, setOpen]);

  return {
    open: exportOpen
  }
}

export default useDialog;
