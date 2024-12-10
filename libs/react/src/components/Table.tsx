import {
  createContext,
  FC,
  HTMLAttributes,
  Key,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

import { twMerge } from 'tailwind-merge';

import Checkbox from './Checkbox';

const SelectionContext = createContext<{
  selectedKeyMap: Map<Key, boolean>;
  rowSelection?: boolean;
  setSelectedKey?: (keys: Key[]) => void;
}>({
  selectedKeyMap: new Map<Key, boolean>(),
  rowSelection: undefined,
  setSelectedKey: () => {},
});

function useSelection() {
  return useContext(SelectionContext);
}

interface CellProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export function Cell({ className = '', children }: CellProps) {
  return <td className={twMerge('p-4', className)}>{children}</td>;
}

interface RenderRowProp {
  selected: boolean;
}

type RenderRow = ({ selected }: RenderRowProp) => ReactNode;

interface RowProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children?: ReactNode | RenderRow;
  valueKey: Key;
}

export function Row({ valueKey, children }: RowProps) {
  const selection = useSelection();

  const { selectedKeyMap, rowSelection, setSelectedKey } = selection;

  const selected = selectedKeyMap.has(valueKey);

  return (
    <tr className="border-b text-[#666A72]">
      {rowSelection && (
        <Cell>
          <Checkbox
            color="blue"
            checked={selected}
            onChange={(c) => {
              if (c) {
                selectedKeyMap.set(valueKey, true);
              } else {
                selectedKeyMap.delete(valueKey);
              }

              setSelectedKey &&
                setSelectedKey(Array.from(selectedKeyMap.keys()));
            }}
          ></Checkbox>
        </Cell>
      )}
      {typeof children === 'function'
        ? (children as RenderRow)({ selected })
        : children}
    </tr>
  );
}

export interface TableSelection {
  setSelectedKeys?: (keys: Key[]) => void;
  selectedKeys?: Key[];
  keys: Key[];
  rowSelection?: boolean;
}

interface Props extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  heads: ReactNode[];
  children: ReactNode;
  selection?: TableSelection;
}

export function Table({ heads, children, className = '', selection }: Props) {
  const selectable = selection != null;

  const selectStatus = useMemo(() => {
    if (!selectable) {
      return 'no';
    }

    if((selection?.keys?.length ?? 0) === 0) {
      return 'no';
    }

    if ((selection?.selectedKeys?.length ?? 0) >= selection.keys.length) {
      return 'all';
    }

    if ((selection?.selectedKeys?.length ?? 0) > 0) {
      return 'partial';
    }

    return 'no';
  }, [selectable, selection?.keys, selection?.selectedKeys]);

  const selectedCache = useMemo(() => {
    const cache = new Map<Key, boolean>();
    if (!selectable || !selection) {
      return cache;
    }

    selection!.selectedKeys?.forEach((key) => {
      cache.set(key, true);
    });

    return cache;
  }, [selectable, selection?.selectedKeys]);

  return (
    <table
      className={twMerge(
        'w-full min-w-max table-auto overflow-hidden rounded-[10px_10px_10px_10px] border',
        className
      )}
    >
      <thead className="h-12">
        <tr className="bg-[#355381] font-bold text-white">
          {selectable && (
            <Cell>
              <Checkbox
                color="blue"
                checked={
                  selectStatus === 'partial'
                    ? 'indeterminate'
                    : selectStatus === 'all'
                }
                onChange={(checked) => {
                  if (selection?.setSelectedKeys) {
                    if (checked) {
                      selection?.setSelectedKeys(selection.keys);
                    } else {
                      selection?.setSelectedKeys([]);
                    }
                  }
                }}
              />
            </Cell>
          )}

          {heads.map((e, index) => (
            <Cell key={index}>{e}</Cell>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white">
        <SelectionContext.Provider
          value={{
            selectedKeyMap: selectedCache,
            rowSelection: selectable && selection?.rowSelection != false,
            setSelectedKey: selection?.setSelectedKeys,
          }}
        >
          {children}
        </SelectionContext.Provider>
      </tbody>
    </table>
  );
}

Table.Cell = Cell;
Table.Row = Row;

interface Table extends FC<Props> {
  Cell: typeof Cell;
  Row: typeof Row;
}

export default Table as Table;
