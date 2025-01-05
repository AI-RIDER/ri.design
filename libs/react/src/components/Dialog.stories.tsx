import type { Meta, StoryObj } from '@storybook/react';

import Dialog from './Dialog';

import { useDialog } from '../hooks';
import Button from './Button';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Dialog',
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Standard: Story = {
  render: (args) => {
    const { open } = useDialog({
      content:
      <>
        <Dialog.Title className="m-0 text-[17px] font-medium text-mauve12">
          Edit profile
        </Dialog.Title>

        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
      </>
    });

    return (
      <Button
        onClick={() => {
          open();
        }}
      >
        Show
      </Button>
    );
  },
};
