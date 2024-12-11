import type { Meta, StoryObj } from '@storybook/react';

import DatePicker from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: "DatePicker",
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Standard: Story = {
  render: ( args ) => {
    return <DatePicker {...args} />
  }
};
