/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Pagination from './Pagination';

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

export const Standard: Story = {
  render: (args) => {
    const [page, setPage] = useState<number | undefined>(args.currentPage);
    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={page}
        maxItems={args.maxItems}
        gotoPage={setPage}
      />
    );
  },
};

export const WithFewPages: Story = {
  render: (args) => {
    const [page, setPage] = useState<number | undefined>(args.currentPage);
    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={page}
        maxItems={args.maxItems}
        gotoPage={setPage}
      />
    );
  },
  args: {
    totalPages: 3,
    currentPage: 1,
  },
};

export const ManyPages: Story = {
  render: (args) => {
    const [page, setPage] = useState<number | undefined>(args.currentPage);
    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={page}
        maxItems={args.maxItems}
        gotoPage={setPage}
      />
    );
  },
  args: {
    totalPages: 20,
    currentPage: 10,
  },
};

export const CustomMaxItems: Story = {
  render: (args) => {
    const [page, setPage] = useState<number | undefined>(args.currentPage);
    return (
      <Pagination
        totalPages={args.totalPages}
        currentPage={page}
        maxItems={args.maxItems}
        gotoPage={setPage}
      />
    );
  },
  args: {
    totalPages: 20,
    currentPage: 10,
    maxItems: 7,
  },
};
