import { Image, Divider } from '@mantine/core'
import './Activity.scss'

const Activity = ({ activity }) => {
  return (
    <div className="activity-wrapper">
      <Divider size="sm" mt={-16} mb={20} ml="-40px" mr="-40px" />
      <Image
        width="100%"
        height={240}
        fit="contain"
        // mt={10}
        mb={40}
        src={activity.urlAttendance}
        withPlaceholder
      />
      <div className="activity-info">
        <h2>{activity.name}</h2>
        <h2>{new Date(activity.date).toLocaleString('pt-BR')}</h2>
        <h3>{activity.group.name}</h3>
      </div>
      <div className="activity-members">
        <table>
          <thead>
            <tr>
              <th>
                <h3>Thành Viên Nhóm</h3>
              </th>
              <th>
                <h4>Điểm danh</h4>
              </th>
            </tr>
          </thead>
          {activity.attendance.map((item) => (
            <tbody key={item.id}>
              <tr>
                <td>
                  <p>{item.member.name}</p>
                </td>
                <td className={item.present ? 'Present' : 'Absent'}>
                  {item.present ? 'Present' : 'Absent'}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Activity
