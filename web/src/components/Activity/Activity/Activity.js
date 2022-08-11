const Activity = ({ activity }) => {
  return (
    <div>
      <h2>TÊN HOẠT ĐỘNG: {activity.name}</h2>
      <h2>Ngày Tổ Chức: {new Date(activity.date).toLocaleDateString('en-GB')}</h2>
      <h3>Nhóm Tham Gia: {activity.group.name}</h3>
      {activity.group.members.map((member) => (
        <h5 key={member.id}>Thành viên Nhóm: {member.name}</h5>
      ))}
    </div>
  )
}

export default Activity
