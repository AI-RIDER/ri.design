import type { Meta, StoryObj } from '@storybook/react';

import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: "Switch",
  argTypes: {
    checked: {
      options: [true, false]
    }
  }
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Standard: Story = {
  render: ( args ) => {
    return <Switch {...args} />
  }
};
