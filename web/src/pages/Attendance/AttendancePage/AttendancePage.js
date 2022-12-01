import ActivityNotAttenCell from 'src/components/Activity/ActivityNotAttenCell'
import { MetaTags } from '@redwoodjs/web'

const AttendancePage = () => {
  return (
    <>
      <MetaTags title="Attendance" description="Attendance page" />
      <ActivityNotAttenCell />
    </>
  )
}

export default AttendancePage
