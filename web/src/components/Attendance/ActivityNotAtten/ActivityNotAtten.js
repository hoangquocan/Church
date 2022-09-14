import { Link, routes } from '@redwoodjs/router'
import './ActivityNotAtten.scss'

const ActivityNotAtten = ({ activities }) => {
  const nowDate = new Date()
  const activitiesToAttendance = activities.filter((activity) =>

  {const compareDate = new Date(activity.date)
    compareDate.setDate(compareDate.getDate() + 30)
  return compareDate > nowDate} )

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
              <td>{new Date(activity.date).toLocaleString( { timeZone: 'UTC' })}</td>
              <td>{activity.group.name}</td>
              <td>
                <nav>
                  <Link
                    to={routes.attendanceActivity({id: activity.id})}
                    className="inline-button inline-button-small inline-button-blue"
                    title={'Attendance Activity ' + activity.name}
                  >
                    Attendance
                  </Link>
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
