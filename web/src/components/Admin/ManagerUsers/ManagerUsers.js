import { Avatar, Group, Text, Menu, Modal, Divider } from '@mantine/core'
import { useState, useRef, useEffect } from 'react'
import { IconEdit, IconMail } from '@tabler/icons'
// import { useMutation } from '@redwoodjs/web'

import EditUserRole from '../EditUserRole/EditUserRole'
import './ManagerUsers.scss'

const ManagerUsers = ({ users }) => {
  const [opened, setOpened] = useState(false)
  const [user, setUser] = useState()
  const iconRefs = useRef([])
  useEffect(() => {
    iconRefs.current = iconRefs.current.slice(0, users.length)
  }, [users])

  const handleMouseEnter = (idx) => {
    setTimeout(() => {
      iconRefs.current[idx].classList.add('hovered')
    }, 400)
  }
  const handleMouseLeave = (idx) => {
    setTimeout(() => {
      iconRefs.current[idx].classList.remove('hovered')
    }, 400)
  }

  const handleModal = () => {
    setOpened(false)
  }

  const checkLeader = (user) => {
    const roles = user.userRoles.map((role) => role.name)
    return roles.includes('leader')
  }

  return (
    <div className="users-wrapper">
      {users.map((user, idx) => (
        <div
          key={user.id}
          className="user-item"
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
        >
          <Avatar
            src={user.avatar}
            radius="50%"
            size="80px"
            mt={-40}
            color="cyan"
            styles={() => ({
              root: {
                border: '3px solid #1A1B1E',
              },
            })}
          />
          <Text align="center" size="lg" weight={700}>
            {user.name || 'No update yet'}
          </Text>
          <Text align="center" size="md" color="dimmed">
            {user.email}
          </Text>
          <Group>
            {user.userRoles.map((role) => (
                <Text key={role.id} align="center" size="lg" weight={400}>
                  {role.name == 'user' ? '' : role.name.toUpperCase()}
                </Text>
            ))}
          </Group>
                <Text>{checkLeader(user) ? user.group?.name : null}</Text>
          <Menu
            width={200}
            height={90}
            trigger="click"
            openDelay={300}
            closeDelay={100}
            position="bottom-end"
            shadow="rgba(0, 0, 0, 0.7) 0px 3px 6px, rgba(0, 0, 0, 0.83) 0px 3px 6px"
            styles={(theme) => ({
              divider: {
                borderColor: theme.colors.gray[5],
              },
              dropdown: {
                background: '#1A1B1E',
              },
              item: {
                margin: '4px 0',
                ':hover': {
                  color: '#000',
                },
              },
            })}
          >
            <Menu.Target>
              <ion-icon
                ref={(el) => (iconRefs.current[idx] = el)}
                name="ellipsis-horizontal-outline"
              ></ion-icon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setUser(user)
                  setOpened(true)
                }}
                color="white"
                icon={<IconEdit size={16} />}
              >
                Update Role
              </Menu.Item>
              <Divider />
              <a target='_blank' href="https://mail.google.com/mail/u/0/#inbox">
              <Menu.Item color="white" icon={<IconMail size={16} />}>
                Send Email
              </Menu.Item></a>
            </Menu.Dropdown>
          </Menu>
        </div>
      ))}
      <Modal
        title="Update User Role"
        opened={opened}
        onClose={() => setOpened(false)}
        zIndex={3}
        styles={(theme) => ({
          modal: {
            marginTop: '100px',
            '@media(min-width: 1024px)': {
                marginLeft: '300px',
              },
          },
          header: {
            fontSize: '1.4rem',
            marginBottom: 0,
            paddingBottom: 10,
            fontWeight: 500,
          },
          close: {
            backgroundColor: '#f2f2f2',
            marginRight: 10,
            width: 32,
            height: 32,
            borderRadius: '50%',
          },
        })}
      >
        <EditUserRole user={user} handleModal={handleModal} />
      </Modal>
    </div>
  )
}

export default ManagerUsers
