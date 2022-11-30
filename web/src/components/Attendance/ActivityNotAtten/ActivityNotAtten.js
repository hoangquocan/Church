import { showNotification } from '@mantine/notifications'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

import './ActivityNotAtten.scss'

const ActivityNotAtten = ({ activities }) => {
  const { userMetadata } = useAuth()
  const leader = userMetadata.email
  const nowDate = new Date()

  const activitiesToAttendance = activities.filter((activity) => {
    const compareDate = new Date(activity.date)
    compareDate.setDate(compareDate.getDate() + 1)
    return compareDate > nowDate
  })

  const handleCheckLeader = (activityLeader, id) => {
    if (activityLeader == leader) {
      navigate(routes.attendanceActivity({ id: id }))
    } else {
      return showNotification({
        color: 'red',
        title: 'Notification!',
        message: 'Please check if you are not the leader of this group',
        rd: 'md',
        autoClose: false,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[9],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[7] },
          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
    }
  }

  return (
    <div className="attendance-page">
      <table>
        <thead>
          <tr>
            <th>Stt</th>
            <th>Activity</th>
            <th>Date Participate</th>
            <th>Group</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {activitiesToAttendance.map((activity) => (
            <tr key={activity.id}>
              <td></td>
              <td>{activity.name}</td>
              <td>
                {new Date(activity.date).toLocaleString('pt-BR')}
              </td>
              <td>{activity.group.name}</td>
              <td>
                <nav>
                  <button
                    onClick={() =>
                      handleCheckLeader(
                        activity.group.leader.email,
                        activity.id
                      )
                    }
                    className="inline-button inline-button-blue"
                    title={'Attendance Activity ' + activity.name}
                  >
                    Attendance<ion-icon name="arrow-redo-circle-outline"></ion-icon>
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActivityNotAtten
