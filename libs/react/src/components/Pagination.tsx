import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon,
} from '@radix-ui/react-icons';
import {
  useCallback,
  useMemo,
  type HTMLAttributes,
  type MouseEventHandler,
} from 'react';
import { twMerge } from 'tailwind-merge';

type PaginationBtnProps = HTMLAttributes<HTMLElement>;
function PaginationBtn({ className, children, ...props }: PaginationBtnProps) {
  return (
    <button
      className={twMerge(
        'flex size-6 items-center justify-center rounded-full border border-[#939C9E] text-xs text-[#939C9E] hover:opacity-80',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface ItemProps extends HTMLAttributes<HTMLElement> {
  item: 'dot' | number;
  currentPage: number;
  onClick: MouseEventHandler<HTMLElement>;
}
function Item({ className, children, item, currentPage, onClick }: ItemProps) {
  if (item === 'dot') return <DotsHorizontalIcon className="size-4" />;
  return (
    <PaginationBtn
      className={item === currentPage ? 'border-[#EE7F2D] text-[#EE7F2D]' : ''}
      onClick={onClick}
    >
      {item}
    </PaginationBtn>
  );
}

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  totalPages: number | undefined;
  currentPage: number | undefined;
  gotoPage: (page: number) => void;
  /**
   * 前一頁跟下一頁的按鈕中間要顯示幾個元素
   * 包含頁碼跟...
   */
  maxItems?: number;
}
export default function Pagination({
  className,
  totalPages,
  currentPage,
  gotoPage,
  maxItems = 5,
}: PaginationProps) {
  // 避免超出範圍
  const safeGotoPage = useCallback(
    (page: number | 'dot') => {
      if (page === 'dot') return;
      if (!totalPages) return;
      if (page < 1) return gotoPage(1);
      if (page > totalPages) return gotoPage(totalPages);
      return gotoPage(page);
    },
    [gotoPage, totalPages]
  );

  const items = useMemo(() => {
    if (!totalPages || !currentPage) return [];

    // 總頁數小於等於最大顯示項目數，直接顯示所有頁碼
    if (totalPages <= maxItems)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    // 在最前幾頁
    if (currentPage <= Math.floor(maxItems / 2))
      return [...Array.from({ length: maxItems - 1 }, (_, i) => i + 1), 'dot'];

    // 在最後幾頁
    if (currentPage >= totalPages - Math.floor(maxItems / 2))
      return [
        'dot',
        ...Array.from(
          { length: maxItems - 1 },
          (_, i) => totalPages - maxItems + 2 + i
        ),
      ];

    // 在中間, 且maxItems是基數
    if (maxItems % 2 === 1) {
      // current page左右兩邊要顯示幾個數字
      // maxItems減掉左右的dot跟中間所以是-3
      const sides = Math.floor((maxItems - 3) / 2);
      return [
        'dot',
        ...Array.from(
          { length: sides * 2 + 1 },
          (_, i) => currentPage - sides + i
        ),
        'dot',
      ];
    }

    // 在中間, 且maxItems是偶數
    // maxItems減掉左右的dot
    const sides = (maxItems - 2) / 2;
    // 把current page放在中間偏左
    return [
      'dot',
      ...Array.from(
        { length: maxItems - 2 },
        (_, i) => currentPage - sides + i
      ),
      'dot',
    ];
  }, [currentPage, maxItems, totalPages]) as ('dot' | number)[];

  if (!totalPages || !currentPage) return null;

  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <PaginationBtn onClick={() => safeGotoPage(currentPage - 1)}>
        <ChevronLeftIcon className="size-4" viewBox="2 0 24 24" />
      </PaginationBtn>
      {items.map((item, index) => (
        <Item
          key={`${item}_${index}`}
          item={item}
          currentPage={currentPage}
          onClick={() => safeGotoPage(item)}
        />
      ))}
      <PaginationBtn onClick={() => safeGotoPage(currentPage + 1)}>
        <ChevronRightIcon className="size-4" viewBox="-2 0 24 24" />
      </PaginationBtn>
    </div>
  );
}
