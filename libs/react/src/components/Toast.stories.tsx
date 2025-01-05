import type { Meta, StoryObj } from '@storybook/react';

import Toast from './Toast';

import useToast from '../hooks/toast';
import Button from './Button';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Toast',
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Toast>;

function oneWeekAway(date: Date) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);
}

export const Standard: Story = {
  render: (args) => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: (
              <time
                className="m-0 text-[13px] leading-[1.3] text-slate11 [grid-area:_description]"
                dateTime={new Date().toISOString()}
              >
                {prettyDate(new Date())}
              </time>
            ),
          });
        }}
      >
        Show
      </Button>
    );
  },
};
