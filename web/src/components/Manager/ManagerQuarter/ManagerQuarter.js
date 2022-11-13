import './ManagerQuarter.scss'


const ManagerQuarter = ({ activities }) => {
  const activitiesByGroup = activities.reduce((result, activity) => {
    result[activity.group.name] = result[activity.group.name] || []
    result[activity.group.name].push(activity)
    return result
  }, {})

const groups = Object.keys(activitiesByGroup)
const totalAttendance = []
const totalPresent = []
for (let group in activitiesByGroup) {
   totalAttendance.push(activitiesByGroup[group].reduce((total, activity) => {
return total + activity.attendance.length
  }, 0))
   totalPresent.push(activitiesByGroup[group].reduce((total, activity) => {
    const present = activity.attendance.filter((item) => item.present)
return total + present.length
  }, 0))

}
  return (
    <div className="manager-quarter-wrapper">
      {groups.map((name, idx) => (
        <div className="manager-quarter-item" key={idx}>
          <h2>{name}</h2>
          <p><span>{totalAttendance[idx]}</span> Total Attendance</p>
          <p><span>{totalPresent[idx]}</span> Total Present</p>
          <p><span>{(totalPresent[idx]/totalAttendance[idx]*100 || 0).toFixed(2)} %</span> Percent Present</p>
        </div>
      ))}
    </div>
  )
}

export default ManagerQuarter
