import './ViewAttendanced.scss'

const ViewAttendance = ({ attendanced }) => {
  return (
    <div className="attendanced-activity">
      {attendanced.map((activity) => (
        <table key={activity.id}>
          <tbody>
            <tr>
              <td>{activity.name}</td>
              <td>{new Date(activity.date).toLocaleDateString('pt-BR')}</td>
            </tr>
            {activity.attendance.map((attendance) => (
              <tr key={attendance.id}>
                <td>{attendance.member.name}</td>
                <td className={attendance.present ? 'Present' : 'Absent'}>{attendance.present ? 'Present' : 'Absent'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  )
}

export default ViewAttendance
