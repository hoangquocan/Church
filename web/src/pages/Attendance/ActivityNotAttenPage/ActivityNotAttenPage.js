import { MetaTags } from '@redwoodjs/web'
import Attendance from 'src/components/Attendance/Attendance'
const ActivityNotAttenPage = () => {
  return (
    <>
      <MetaTags title="ActivityNotAtten" description="ActivityNotAtten page" />
      <Attendance />

    </>
  )
}

export default ActivityNotAttenPage
