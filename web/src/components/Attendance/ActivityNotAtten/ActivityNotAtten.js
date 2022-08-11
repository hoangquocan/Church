import { Link, routes } from '@redwoodjs/router'
import './ActivityNotAtten.scss'

const ActivityNotAtten = ({ activities }) => {
  return (
    <div className="attendance-page">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Activity Name</th>
            <th>Date Participate</th>
            <th>Group Participate</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.name}</td>
              <td>{new Date(activity.date).toLocaleDateString('en-GB')}</td>
              <td>{activity.group.name}</td>
              <td>
                <nav>
                  <Link
                    to={routes.attendanceActivity()}
                    className="rw-button rw-button-small rw-button-blue"
                    title={'Attendance Activity ' + activity.name}
                  >
                    ATTENDANCE
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
