import './Activity.scss'
const Activity = ({ activity }) => {
  return (
    <div className="activity-wrapper">
      <h2>TÊN HOẠT ĐỘNG: {activity.name}</h2>
      <h2>Ngày Tổ Chức: {new Date(activity.date).toLocaleString( { timeZone: 'UTC' })}</h2>
      <h3>Nhóm Tham Gia: {activity.group.name}</h3>
      <h5>Thành Viên Nhóm</h5>
      {activity.group.members.map((member) => (
        <p key={member.id}>{member.name}</p>
      ))}
      <img src={activity.urlAttendance} />
    </div>
  )
}

export default Activity
