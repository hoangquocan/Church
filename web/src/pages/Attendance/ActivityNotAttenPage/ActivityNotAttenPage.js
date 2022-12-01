import { MetaTags } from '@redwoodjs/web'
import AttendanceActivityCell from 'src/components/Attendance/AttendanceActivityCell'

const ActivityNotAttenPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Attendance" description="Activity Not Attendance page" />
      <AttendanceActivityCell id={id} />
    </>
  )
}

export default ActivityNotAttenPage
