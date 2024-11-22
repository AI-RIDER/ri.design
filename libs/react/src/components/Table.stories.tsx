import type { Meta, StoryObj } from '@storybook/react';

import Table, { Cell, Row } from './Table';
import { Fragment, Key, useEffect, useMemo, useState } from 'react';
import Checkbox from './Checkbox';

const meta: Meta<typeof Table> = {
  component: Table,
  title: "Table",
  argTypes: {

  }
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Standard: Story = {
  render: ( args ) => {
    const heads = ['Name', 'PhoneNumber', 'Email', 'Address', 'Actions'];

    const rows = [
      {
        name: 'neil',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil1',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil2',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      }
    ]

    return (
      <Table heads={heads}>
        {
          rows.map((row) => {
            const { name, phoneNumber, email, address, actions } = row;
            return (
              <Row valueKey={row.name}>
                <Cell>{name}</Cell>
                <Cell>{phoneNumber}</Cell>
                <Cell>{email}</Cell>
                <Cell>{address}</Cell>
                <Cell>{actions}</Cell>
              </Row>
            )
          })
        }
      </Table>
    )
  }
};

export const Selection: Story = {
  render: ( args ) => {
    const heads = ['Name', 'PhoneNumber', 'Email', 'Address', 'Actions'];

    const rows = [
      {
        name: 'neil',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil1',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil2',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      }
    ]

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    return (
      <Table heads={heads} selection={{
        keys: rows.map(r => r.name),
        selectedKeys: selectedKeys,
        setSelectedKeys: setSelectedKeys
      }}>
        {
          rows.map((row) => {
            const { name, phoneNumber, email, address, actions } = row;
            return (
              <Row key={row.name} valueKey={row.name}>
                <Fragment>
                  <Cell>{name}</Cell>
                  <Cell>{phoneNumber}</Cell>
                  <Cell>{email}</Cell>
                  <Cell>{address}</Cell>
                  <Cell>{actions}</Cell>
                </Fragment>
              </Row>
            )
          })
        }
      </Table>
    )
  }
};

export const Handle_Selected_Row: Story = {
  render: ( args ) => {
    const heads = ['Name', 'PhoneNumber', 'Email', 'Address', 'Actions'];

    const rows = [
      {
        name: 'neil',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil1',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil2',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      }
    ]

    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

    return (
      <Table heads={heads} selection={{
        keys: rows.map(r => r.name),
        selectedKeys: selectedKeys,
        setSelectedKeys: setSelectedKeys
      }}>
        {
          rows.map((row) => {
            const { name, phoneNumber, email, address, actions } = row;
            return (
              <Row key={row.name} valueKey={row.name}>
                {
                  ({selected}) => (
                    <Fragment>
                      <Cell>{name + (selected ? '(selected)' : '')}</Cell>
                      <Cell>{phoneNumber}</Cell>
                      <Cell>{email}</Cell>
                      <Cell>{address}</Cell>
                      <Cell>{actions}</Cell>
                    </Fragment>
                  )
                }
              </Row>
            )
          })
        }
      </Table>
    )
  }
};

export const Custom_Selection: Story = {
  render: ( args ) => {
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
    const [allSelected, setAllSelected] = useState<boolean>(false);

    const rows = [
      {
        name: 'neil',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil1',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      },
      {
        name: 'neil2',
        phoneNumber: 'xxxxxxxxxx',
        email: 'xxx@gamil.com',
        address: 'xxx',
        actions: '<action>'
      }
    ]

    const heads = useMemo(() => {
      return [
        <Checkbox checked={allSelected} onChange={c => {
          setAllSelected(c);

          if(c) {
            setSelectedKeys(rows.map(r => r.name));
          } else {
            setSelectedKeys([]);
          }
        }} />,
        'Name', 'PhoneNumber', 'Email', 'Address', 'Actions']
    }, [allSelected]);

    return (
      <Table heads={heads}>
        {
          rows.map((row) => {
            const { name, phoneNumber, email, address, actions } = row;
            return (
              <Row key={row.name} valueKey={row.name}>
                <Cell>
                  <Checkbox checked={selectedKeys.includes(row.name)} onChange={c => {
                    if(c) {
                      setSelectedKeys(prev => [...prev, row.name]);
                    } else {
                      setSelectedKeys(prev => prev.filter(r => r !== row.name));
                    }
                  }} />
                </Cell>
                <Cell>{name}</Cell>
                <Cell>{phoneNumber}</Cell>
                <Cell>{email}</Cell>
                <Cell>{address}</Cell>
                <Cell>{actions}</Cell>
              </Row>
            )
          })
        }
      </Table>
    )
  }
};
