import { showNotification } from '@mantine/notifications'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'

import './ActivityNotAtten.scss'

const ActivityNotAtten = ({ activities }) => {
  const { userMetadata } = useAuth()
  const leader = userMetadata.email
  const nowDate = new Date()

  const activitiesToAttendance = activities.filter((activity) => {
    const compareDate = new Date(activity.date)
    compareDate.setDate(compareDate.getDate() + 30)
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
            borderColor: theme.colors.red[4],

            '&::before': { backgroundColor: theme.red },
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
                {new Date(activity.date).toLocaleString({ timeZone: 'UTC' })}
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
                    className="inline-button inline-button-small inline-button-blue"
                    title={'Attendance Activity ' + activity.name}
                  >
                    Attendance
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
