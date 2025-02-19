import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Pagination, { type PaginationProps } from './Pagination';

const meta: Meta<typeof Pagination> = {
  component: Pagination,
  title: 'Pagination',
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1 },
      defaultValue: 10,
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      defaultValue: 1,
    },
    maxItems: {
      control: { type: 'number', min: 3 },
      defaultValue: 5,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const PaginationWrapper = ({
  totalPages,
  currentPage,
  maxItems,
}: PaginationProps) => {
  const [page, setPage] = useState(currentPage);
  return (
    <Pagination
      totalPages={totalPages}
      currentPage={page}
      maxItems={maxItems}
      gotoPage={setPage}
    />
  );
};

export const Standard: Story = {
  render: (args) => <PaginationWrapper {...args} />,
};

export const WithFewPages: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 3,
    currentPage: 1,
  },
};

export const ManyPages: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 20,
    currentPage: 10,
  },
};

export const CustomMaxItems: Story = {
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    totalPages: 20,
    currentPage: 10,
    maxItems: 7,
  },
};
