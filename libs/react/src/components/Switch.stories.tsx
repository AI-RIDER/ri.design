import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './Sidebar';

import {
  MagnifyingGlassIcon,
  EyeOpenIcon,
  BookmarkIcon,
} from '@radix-ui/react-icons';

const { Menu, MenuItem, Header, Item } = Sidebar;

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Sidebar',
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Standard: Story = {
  render: (args) => {
    const items = [
      {
        id: 'issues',
        title: 'Issues',
        icon: <BookmarkIcon className="w-5 h-5" />,
      },
      {
        id: 'explore',
        title: 'Explore',
        content: ['Profiles', 'Replays', 'Discover'],
        icon: <MagnifyingGlassIcon className="w-5 h-5" />,
      },
      {
        id: 'insights',
        title: 'Insights',
        content: ['Requests', 'Queries', 'Assets'],
        icon: <EyeOpenIcon className="w-5 h-5" />,
      },
    ];

    return (
      <div className="h-screen">
        <Sidebar>
          <Header>
            <div className="bg-black w-full px-6 py-6 flex">
              <img alt="logo" src="https://i.ibb.co/rGqsDrn/logo.png" />
            </div>
          </Header>
          {items.map((item) => {
            const { id, title, content, icon } = item;

            if (!content) {
              return <Item value={id} title={title} icon={icon}></Item>;
            }

            return (
              <Menu value={id} title={title} icon={icon}>
                {content &&
                  content.map((c) => {
                    return <MenuItem>{c}</MenuItem>;
                  })}
              </Menu>
            );
          })}
        </Sidebar>
      </div>
    );
  },
};
