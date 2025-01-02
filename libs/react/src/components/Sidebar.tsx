import { FC, ReactNode, useState, createContext, useContext } from 'react';

import * as AccrodionPrimitive from '@radix-ui/react-accordion';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';

const SidebarContext = createContext<{
  selected: string;
  setSelected: (selectd: string) => void;
}>({
  selected: '',
  setSelected: (s: string) => {},
});

const useSidebar = () => useContext(SidebarContext);

interface SidebarMenuProps {
  value: string;
  title?: ReactNode | (({ open }: { open: boolean }) => ReactNode);
  indicator?: ReactNode | false;
  icon?: ReactNode | false;
  children?: ReactNode | (({ open }: { open: boolean }) => ReactNode);
}

interface SidebarMenuItemProps {
  children?: ReactNode;
}

interface SidebarGroupProps {
  title: string;
  children?: ReactNode;
}

export interface SidebarProps {
  children: ReactNode;
}

interface SidebarHeaderProps {
  children?: ReactNode;
}

interface SidebarFooterProps {}

function SidebarHeader({ children }: SidebarHeaderProps) {
  return <div className="flex justify-center w-full text-2xl">{children}</div>;
}

function SidebarMenu({
  value,
  icon,
  indicator,
  title,
  children,
}: SidebarMenuProps) {
  const { selected } = useSidebar();

  const open = value === selected;

  return (
    <AccrodionPrimitive.Item className="text-white" value={value}>
      <AccrodionPrimitive.Header
        className={`no-underline min-h-[3.5em] flex items-center cursor-pointer ${
          open ? 'bg-[#448AF3]' : ''
        } px-4 transition-colors`}
      >
        <AccrodionPrimitive.Trigger className="flex justify-between w-full items-center hover:opacity-80">
          <div className="flex items-center">
            {typeof icon !== 'boolean' && icon && (
              <div className="px-2">{icon}</div>
            )}

            {typeof title === 'function' ? title({ open }) : title}
          </div>

          {typeof indicator !== 'boolean' &&
            children != null &&
            (indicator || (
              <ChevronRightIcon
                className={twMerge(
                  'h-5 w-5',
                  open ? 'rotate-90' : '',
                  'transition-transform'
                )}
              />
            ))}
        </AccrodionPrimitive.Trigger>
      </AccrodionPrimitive.Header>

      <AccrodionPrimitive.Content
        className="data-[state=closed]:animate-ri_SlidebarMenuSlideUp data-[state=open]:animate-ri_SlidebarMenuSlideDown overflow-hidden"
      >
        <ul
          className=""
        >
          {typeof children === 'function' ? children({ open }) : children}
        </ul>
      </AccrodionPrimitive.Content>
    </AccrodionPrimitive.Item>
  );
}

function SidebarMenuItem({ children }: SidebarMenuItemProps) {
  return <li className="py-2 px-6 hover:text-gray-300 cursor-pointer">{children}</li>;
}

function SidebarGroup() {}

function Sidebar({ children }: SidebarProps) {
  const [selected, setSelected] = useState('');

  return (
    <SidebarContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      <AccrodionPrimitive.Root
        className="sticky bg-[#2A2A2A] top-[76px] h-full flex flex-col gap-2 w-[240px] text-white"
        type="single"
        onValueChange={(v) => {
          setSelected(v);
        }}
      >
        {children}
      </AccrodionPrimitive.Root>
    </SidebarContext.Provider>
  );
}

interface Sidebar extends FC<SidebarProps> {
  Menu: typeof SidebarMenu;
  MenuItem: typeof SidebarMenuItem;
  Group: typeof SidebarGroup;
  Header: typeof SidebarHeader;
}

Sidebar.Menu = SidebarMenu;
Sidebar.MenuItem = SidebarMenuItem;
Sidebar.Group = SidebarGroup;
Sidebar.Header = SidebarHeader;

export default Sidebar as Sidebar;
