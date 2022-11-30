import { navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { useState, useRef, useEffect } from 'react'
import { Text, Menu, Modal, Divider } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'
import { IconEye, IconTrash, IconUserPlus, IconEdit } from '@tabler/icons'

import { QUERY } from '../GroupsCell'
import './Groups.scss'
import GroupUpdateLeader from '../GroupUpdateLeader/GroupUpdateLeader'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
const Groups = ({ groups, page }) => {
  const [opened, setOpened] = useState(false)
  const [group, setGroup] = useState()

  const iconRefs = useRef([])
  const { hasRole } = useAuth()

  useEffect(() => {
    iconRefs.current = iconRefs.current.slice(0, groups.length)
  }, [groups])

  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Group Has Been Deleted!',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[7],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.white },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
    },
    refetchQueries: [{ query: QUERY, variables: { page: page } }],
    awaitRefetchQueries: true,
  })

  const handleDelete = (id, name) => {
    if (!hasRole(['admin', 'manager'])) {
      return showNotification({
        color: 'red',
        title: 'Error! Only admin, manager can use this feature',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.colors.gray[6],
            '&:hover': { backgroundColor: theme.colors.gray[4] },
          },
        }),
      })
    }
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete Group {name}?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteGroup({ variables: { id } }),
    })
  }

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

  return (
    <div className="groups-wrapper">
      <div className="groups-info">
        {groups.map((group, idx) => (
          <div
            key={group.id}
            className="groups-item"
            // onClick={() => handleMouseEnter(idx)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <Text size={24} weight={700} color="#A61E4D">
              {group.name}
            </Text>
            <Text size={22} weight="500">
              <p>Leader</p>
              {group.leader?.name || group.leader?.email || ''}
            </Text>
            <Text>
              Group Id <span>{group.id}</span>
            </Text>
            <Text>
              Total Members <span>{group.members.length}</span>
            </Text>
            <Menu
              width={190}
              trigger="click"
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
                  margin: '2px 0',
                  ':hover:not(:last-child)': {
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
                  color="white"
                  icon={<IconEye size={20} />}
                  onClick={() => {
                    navigate(routes.group({ id: group.id }))
                  }}
                >
                  View Info
                </Menu.Item>
                <Divider />
                <Menu.Item
                  color="white"
                  icon={<IconUserPlus size={20} />}
                  onClick={() => {
                    navigate(
                      routes.groupAddMem({ id: group.id, name: group.name })
                    )
                  }}
                >
                  Add Member
                </Menu.Item>
                <Divider />
                <Menu.Item
                  color="white"
                  icon={<IconEdit size={20} />}
                  onClick={() => {
                    setGroup(group)
                    setOpened(true)
                  }}
                >
                  Update
                </Menu.Item>
                <Divider />
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={20} />}
                  onClick={() => handleDelete(+group.id, group.name)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ))}
        <Modal
          title="Update Group"
          opened={opened}
          onClose={() => setOpened(false)}
          zIndex={3}
          styles={() => ({
            modal: {
              backgroundColor: '#2C2E33',
              marginTop: '20px',
              '@media(min-width: 1024px)': {
                marginTop: '50px',
                marginLeft: '300px',
                width: '600px',
              },
            },
            title: {
              margin: '0 auto',
              fontSize: '28px',
              fontWeight: 500,
              color: '#fff',
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
          <GroupUpdateLeader
            group={group}
            page={page}
            handleModal={handleModal}
          />
        </Modal>
      </div>
    </div>
  )
}

export default Groups
