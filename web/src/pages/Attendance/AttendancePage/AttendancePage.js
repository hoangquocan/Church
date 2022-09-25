import ActivityNotAttenCell from 'src/components/Activity/ActivityNotAttenCell'
import { MetaTags } from '@redwoodjs/web'
const AttendancePage = () => {
  // console.log(new Date(2022-09-20T01:00:00.000Z))
  return (
    <>
      <MetaTags title="Attendance" description="Attendance page" />
      <ActivityNotAttenCell />
    </>
  )
}

export default AttendancePage
