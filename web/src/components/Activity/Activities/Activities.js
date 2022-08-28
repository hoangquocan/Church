import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { useState, useMemo } from 'react'

import { Pagination } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

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
        icon: <ion-icon name="checkmark"></ion-icon>,
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            // backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.red[4],

            // '&::before': { backgroundColor: theme.white },
          },

          title: { color: theme.colors.red[5] },
          // description: { color: theme.white },
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
  const totalPage = Math.ceil(totalActivities / 10)
  const resultActivities = useMemo(() => {
    const activitiesRender = []
    for (let i = 0; i < totalActivities; i += 10) {
      const activitiesPerPage = activities.slice(i, i + 10)
      activitiesRender.push(activitiesPerPage)
    }
    return activitiesRender
  }, [activities])

  const handleClick = (id, name) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete Activity {name}?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () => deleteActivity({ variables: { id } }),
    })
  }
  return (
    <div className="activities-wrapper">
      <header className="activities-header">
        <Link
          to={routes.newActivity()}
          className="inline-button inline-button-small inline-button-green"
        >
          <ion-icon name="add-circle-outline"></ion-icon>New Activity
        </Link>
        <nav>
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
        </nav>
      </header>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Activity Name</th>
            <th>Date Participate</th>
            <th>Group Participate</th>
            <th>Created At</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resultActivities[activePage - 1].map((activity) => (
            <tr key={activity.id}>
              <td></td>
              <td>{activity.name}</td>
              <td>
                {new Date(activity.date).toLocaleString({ timeZone: 'UTC' })}
              </td>
              <td>{activity.group.name}</td>
              <td>{timeTag(activity.createdAt)}</td>
              <td><img src={activity.urlAttendance} /></td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="activities-pagination">
        <Pagination
          position="center"
          page={activePage}
          onChange={setActivePage}
          total={totalPage}
          radius="lg"
          withEdges
        />
      </div>
    </div>
  )
}

export default Activities
