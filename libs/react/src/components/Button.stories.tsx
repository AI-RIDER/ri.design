import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Button",
  argTypes: {
    color: {
      options: ['default', 'yellow', 'red', 'blue', 'green', 'none']
    },
    onClick: {
      type: 'function',
      description: 'Optional click handler'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Standard: Story = {
  args: {
    color: 'blue',
  },
  render: (args) => {
    return <Button {...args}>Click Me</Button>
  }
};
