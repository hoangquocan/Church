import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import ViewReportGroupCell from 'src/components/Leader/ViewReportGroupCell'
import 'src/components/Manager/ExportSurvey/ExportSurvey.scss'
const ReportPage = () => {
  const groupId = +localStorage.getItem('groupId')
  const [monthSelect, setMonthSelect] = useState(
    new Date(new Date().setMonth(new Date().getMonth()))
  )

  const time = monthSelect.getFullYear() + '-' + monthSelect.getMonth()

  return (
    <div className='export-wrapper'>
      <MetaTags title="Report" description="Report page" />
      <div className="datepicker-month">
      <h2 className='text-center'>Select Month To View Report</h2>
        <DatePicker
          selected={monthSelect}
          onChange={(date) => setMonthSelect(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          popperPlacement='bottom'
        />
      </div>
      <ViewReportGroupCell groupId={groupId} time={time} />
    </div>
  )
}

export default ReportPage
