import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "Checkbox",
  argTypes: {
    checked: {
      options: [true, false, 'indeterminate']
    }
  }
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Standard: Story = {
  render: ( args ) => {
    return <Checkbox {...args} />
  }
};
