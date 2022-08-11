import { Link, routes } from "@redwoodjs/router"
import { QUERY as ACTIVITY_NOT_ATTEN } from "src/components/Activity/ActivityNotAttenCell"
import { useQuery } from "@redwoodjs/web"


const Attendance = () => {
  const { data } = useQuery(ACTIVITY_NOT_ATTEN)
  console.log(data);
  return (
    <div>
      {data.activities.map((activity) => (
        <h2 key={activity.id}>{activity.name}</h2>
      ))}
    </div>
  )
}
export default Attendance
