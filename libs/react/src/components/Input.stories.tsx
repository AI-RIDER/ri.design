import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Input",
  argTypes: {
    checked: {
      options: [true, false]
    }
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Standard: Story = {
  render: ( args ) => {
    const [text, setText] = useState('');

    return <Input {...args} value={text} onChange={setText} />
  }
};
