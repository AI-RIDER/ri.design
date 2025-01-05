import { useCallback, useEffect, useMemo, useRef, ReactDOM, useState } from 'react';
import { createRoot } from 'react-dom/client'
import Toast, { type ToastProps } from '../components/Toast';
import { createPortal } from 'react-dom';

function getRootEl() {
  return document.querySelector('body');
}

const rootEl = getRootEl();

let toastRootEl = document.createElement('div');
toastRootEl.id = "__ri_toast_root";

rootEl?.append(toastRootEl);

const root = createRoot(toastRootEl)

function useToast() {
  const [open, setOpen] = useState(false);

  const [props, setProps] = useState<ToastProps>({
    open: false
  });

  const timeoutRef = useRef(0);

  useEffect(() => {
    const mix: ToastProps = {
      ...props,
      open,
      swipeDirection: props.swipeDirection || 'right',
      swipeThreshold: props.swipeThreshold || 50,
      duration: props.duration || 5000,
      onOpenChange: (v: boolean) => {
        setOpen(v)
      }
    }

    const toastInstance = <Toast {...mix}></Toast>;

    root.render(toastInstance);
  }, [props, open, setOpen])

  const toast = useCallback((toastProps?: ToastProps) => {
    if(!rootEl) {
      return;
    }

    setProps((prev) => {
      return {
        ...prev,
        ...toastProps
      }
    });

    setOpen(false);

    setTimeout(() => {
      setOpen(true);
    }, 100);
  }, [setProps, setOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    toast
  }
}

export default useToast;
