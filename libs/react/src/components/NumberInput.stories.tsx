import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import NumberInput from './NumberInput';

const meta = {
  title: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = (value: number) => {
  // This is an intentionally empty function for Storybook args
  console.log('NumberInput value changed:', value);
};

// Wrapper component for handling state
const NumberInputWrapper = (props: Partial<React.ComponentProps<typeof NumberInput>>) => {
  const [value, setValue] = useState(0);
  return <NumberInput value={value} onChange={setValue} {...props} />;
};

// Initial value wrapper
const InitialValueWrapper = () => {
  const [value, setValue] = useState(42);
  return (
    <NumberInput
      value={value}
      onChange={setValue}
      placeholder="With initial value"
    />
  );
};

// Basic usage
export const Basic: Story = {
  args: {
    value: 0,
    onChange: noop,
  },
  render: () => <NumberInputWrapper />
};

// With min and max
export const WithLimits: Story = {
  args: {
    value: 0,
    onChange: noop,
    min: 0,
    max: 100,
  },
  render: () => (
    <NumberInputWrapper
      min={0}
      max={100}
      placeholder="Enter a number (0-100)"
    />
  )
};

// With custom step
export const CustomStep: Story = {
  args: {
    value: 0,
    onChange: noop,
    step: 5,
  },
  render: () => (
    <NumberInputWrapper
      step={5}
      placeholder="Step by 5"
    />
  )
};

// With all constraints
export const FullyConstrained: Story = {
  args: {
    value: 0,
    onChange: noop,
    min: 0,
    max: 100,
    step: 10,
  },
  render: () => (
    <NumberInputWrapper
      min={0}
      max={100}
      step={10}
      placeholder="Step by 10 (0-100)"
    />
  )
};

// Disabled state
export const Disabled: Story = {
  args: {
    value: 50,
    onChange: noop,
    disabled: true,
  },
  render: () => (
    <NumberInputWrapper
      disabled
      value={50}
      placeholder="Disabled input"
    />
  )
};

// Custom width
export const CustomWidth: Story = {
  args: {
    value: 0,
    onChange: noop,
    className: 'w-32',
  },
  render: () => (
    <NumberInputWrapper
      className="w-32"
      placeholder="Custom width"
    />
  )
};

// With initial value
export const WithInitialValue: Story = {
  args: {
    value: 42,
    onChange: noop,
  },
  render: () => <InitialValueWrapper />
};
