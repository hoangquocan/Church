import { MetaTags } from '@redwoodjs/web'
import SelectViewAttendanced from 'src/components/Attendance/SelectViewAttendanced'

const AttendancedPage = () => {
  return (
    <>
      <MetaTags title="Attendanced" description="Attendanced page" />
      <SelectViewAttendanced />
    </>
  )
}

export default AttendancedPage
