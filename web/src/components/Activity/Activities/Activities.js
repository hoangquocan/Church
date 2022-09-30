import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useState, useMemo } from 'react'

import { Pagination, useMantineTheme, Text, Image } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useMediaQuery } from '@mantine/hooks'

import { QUERY } from '../ActivitiesCell'
import './Activities.scss'

const DELETE_ACTIVITY_MUTATION = gql`
  mutation DeleteActivityMutation($id: Int!) {
    deleteActivity(id: $id) {
      id
    }
  }
`
const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toLocaleString('sv')}
    </time>
  )
}
const Activities = ({ activities }) => {
  const [activePage, setActivePage] = useState(1)
  const [isDelete, setIsDelete] = useState(false)
  const [isShow, setIsShow] = useState(false)

  const [deleteActivity] = useMutation(DELETE_ACTIVITY_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Activity Has Been Deleted!',
        // icon: <ion-icon style={{ color: 'white' }} name="checkmark"></ion-icon>,
        autoClose: 3000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],

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
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const totalActivities = activities.length
  const totalPage = Math.ceil(totalActivities / 12)
  const resultActivities = useMemo(() => {
    const activitiesRender = []
    for (let i = 0; i < totalActivities; i += 12) {
      const activitiesPerPage = activities.slice(i, i + 12)
      activitiesRender.push(activitiesPerPage)
    }
    return activitiesRender
  }, [activities])

  const handleClick = (id, name) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete Activity {name}?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => deleteActivity({ variables: { id } }),
    })
  }

  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
  <div className="activities-wrapper">
    <header className="activities-header">
        <button
          onClick={() => setIsShow(!isShow)}
          className="inline-button inline-button-small inline-button-blue"
          title="Show Activity"
        >
          <ion-icon name="information-circle-outline"></ion-icon>Show Info
        </button>
        <button
          onClick={() => setIsDelete(!isDelete)}
          className="inline-button inline-button-small inline-button-red"
          title="Delete Activity"
        >
          <ion-icon name="trash-outline"></ion-icon>Delete
        </button>
    </header>
      <div className="activities-inner">
        {/* <div className="activities-inner__info"> */}
          {resultActivities[activePage - 1].map((activity) => (
            <div key={activity.id} className="activities-item">
              <Image
              mt="-30px"
                width='100%'
                height={140}
                src={activity.urlAttendance}
                withPlaceholder
              />
              <Text></Text>
              <Text size="lg" weight={700} color="#A61E4D">{activity.name}</Text>
              <Text>
                {new Date(activity.date).toLocaleString({ timeZone: 'UTC' })}
              </Text>
              <Text>{activity.group.name}</Text>
              {/* <Text>{timeTag(activity.createdAt)}</Text> */}
              <Text>
                <nav className="activity-table-action">
                  {isShow && (
                    <Link
                      to={routes.activity({ id: activity.id })}
                      className="rw-button rw-button-small rw-button-blue"
                      title={'Show Activity ' + activity.name}
                    >
                      <ion-icon
                        style={{
                          color: '#15AABF',
                        }}
                        name="information-circle-outline"
                      ></ion-icon>{' '}
                    </Link>
                  )}
                  {isDelete && activity.attendance.length == 0 && (
                    <a
                      href="#"
                      onClick={() => handleClick(activity.id, activity.name)}
                      className="rw-button rw-button-small rw-button-red"
                      title={'Delete Activity ' + activity.name}
                    >
                      <ion-icon
                        style={{
                          color: '#FA5252',
                        }}
                        name="trash-outline"
                      ></ion-icon>
                    </a>
                  )}
                </nav>
              </Text>
            </div>
          ))}
        {/* </div> */}
      </div>
        <div className="activities-pagination">
          <Pagination
            position="center"
            page={activePage}
            onChange={setActivePage}
            total={totalPage}
            radius="lg"
            withEdges
            size={isMobile ? 'xs' : 'md'}
            styles={{
              item: {
                fontWeight: '300',
              },
            }}
          />
        </div>
  </div>
  )
}

export default Activities
