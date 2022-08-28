import { Link, routes } from '@redwoodjs/router'
import './ActivityNotAtten.scss'

const ActivityNotAtten = ({ activities }) => {
  return (
    <div className="attendance-page">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Activity Name</th>
            <th>Date Participate</th>
            <th>Group Participate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
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
