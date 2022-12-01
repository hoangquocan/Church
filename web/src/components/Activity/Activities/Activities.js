import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useState, useEffect, useRef } from 'react'
import { Menu, Text, Image, Modal, Divider } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconTrash, IconEye } from '@tabler/icons'
import { useAuth } from '@redwoodjs/auth'
import { QUERY } from '../ActivitiesPageCell'
import './Activities.scss'
import Activity from '../Activity/Activity'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`
const Activities = ({ activities, page }) => {
  const [opened, setOpened] = useState(false)
  const [activity, setActivity] = useState()
  const [idxActivity, setIdxActivity] = useState()

  const { hasRole } = useAuth()
  const iconRefs = useRef([])
  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Activity Has Been Deleted!',
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[2],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.gray[6] },
          },
        }),
      })
    },
    onError: (error) => {
      showNotification({
        color: 'red',
        title: `${error}`,
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
    },
    refetchQueries: [{ query: QUERY, variables: { page: page } }],
    awaitRefetchQueries: true,
  })

  const totalActivities = activities.length
  useEffect(() => {
    iconRefs.current = iconRefs.current.slice(0, totalActivities)
  }, [activities])

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
      children: <p>Are you sure want to delete Activity {name}?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteActivity({ variables: { id } }),
    })
  }

  return (
    <div className="activities-wrapper">
      <div className="activities-inner">
        {activities.map((activity, idx) => (
          <div
            key={activity.id}
            className="activities-item"
            onMouseDown={() => handleMouseEnter(idx)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <Image
              width="100%"
              height={180}
              src={activity.urlAttendance}
              withPlaceholder
            />
            {/* <Link to={routes.activity({ id: activity.id })}> */}
              <Text size={24} weight={700} color="#A61E4D" ml={10} mr={10}>
                {activity.name}
              </Text>
            {/* </Link> */}
            <Text size={18}>{new Date(activity.date).toLocaleString('pt-BR')}</Text>
            <Text size={18}>{activity.group.name}</Text>
            <Menu
              width={200}
              height={90}
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
                    setActivity(activity)
                    setOpened(true)
                    setIdxActivity(idx)
                  }}
                >
                  View Info
                </Menu.Item>
                <Divider />
                <Menu.Item
                  color="red"
                  icon={<IconTrash size={20} />}
                  onClick={() => handleDelete(+activity.id, activity.name)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        ))}
        <Modal
          title="Activity Info"
          opened={opened}
          onClose={() => {setOpened(false)
          handleMouseLeave(idxActivity)
          }}
          zIndex={3}
          overlayColor="transparent"
          overlayBlur={1}
          padding={0}
          styles={() => ({
            modal: {
              overflowX: 'hidden',
              width: 'auto',
              marginTop: '20px',
              '@media(min-width: 1024px)': {
                marginTop: '50px',
                marginLeft: '300px',
                width: '800px',
              },
            },
            inner: {
              padding: '48px 2px',
              '@media(min-width: 480px)': {
                padding: '60px 16px',
              },
            },
            title: {
              margin: '0 auto',
              fontSize: '28px',
              fontWeight: 500,
            },
            close: {
              color: '#000',
              backgroundColor: '#f2f2f2',
              marginRight: 26,
              width: 32,
              height: 32,
              borderRadius: '50%',
            },
          })}
        >
          <Activity activity={activity} />
        </Modal>
      </div>
    </div>
  )
}

export default Activities
