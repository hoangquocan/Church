import './Activity.scss'
const Activity = ({ activity }) => {
  return (
    <div className="activity-wrapper">
      <div className="activity-info">
        <h2>{activity.name}</h2>
        <h2>{new Date(activity.date).toLocaleString({ timeZone: 'UTC' })}</h2>
        <h3>{activity.group.name}</h3>
      </div>
      <div className="activity-members">
        <h3>Thành Viên Nhóm</h3>
        {activity.group.members.map((member) => (
          <p key={member.id}>{member.name}</p>
        ))}
      </div>
      <img src={activity.urlAttendance} />
    </div>
  )
}

export default Activity
