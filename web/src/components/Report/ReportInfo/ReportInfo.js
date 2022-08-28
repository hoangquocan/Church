
const ReportInfo = ({ activities }) => {
  return (
    <div>
      {activities.map((activity) => (
        <h1 key={activity.id}>{activity.name}</h1>
      ))}
    </div>
  )
}

export default ReportInfo
