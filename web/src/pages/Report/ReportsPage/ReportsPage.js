import { MetaTags } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from 'react'
import { Divider } from '@mantine/core'

import ReportChartByMonthCell from 'src/components/Report/ReportChartByMonthCell'
import ReportsPortalCell from 'src/components/Report/ReportsPortalCell'
import './ReportsPage.scss'

const ReportsPage = () => {
  const { hasRole } = useAuth()
  const today = new Date()
  const [monthSelect, setMonthSelect] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  )
  const [fromMonth, setFromMonth] = useState(
    new Date(new Date().setDate(today.getDate() - 30))
  )
  const [toMonth, setToMonth] = useState(new Date())

  const timeReport = monthSelect.getFullYear() + '-' + monthSelect.getMonth()

  return (
    <div className="reports-wrapper">
      <MetaTags title="Reports" description="Reports page" />
      <nav className='reports-navheader'>
        {hasRole(['admin', 'manager']) && (
          <Link
            className="inline-button inline-button-small inline-button-blue"
            to={routes.createQuestion()}
          >
            <ion-icon name="document-text-outline"></ion-icon>Question Survey
          </Link>
        )}
        <Link
          className="inline-button inline-button-small inline-button-green"
          to={routes.reportCreate()}
        >
          <ion-icon name="open-outline"></ion-icon>Create Report
        </Link>
      </nav>
      <ReportsPortalCell fromMonth={fromMonth} toMonth={toMonth} />
      <Divider size="sm" mt={20} ml={-30} mr={-30} />
      <div className="reports-select-month">
        <h4>Select Month To View Result</h4>
        <DatePicker
          selected={monthSelect}
          onChange={(date) => setMonthSelect(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <ReportChartByMonthCell timeReport={timeReport} />
      <Divider
        my="xs"
        label={
          <h4 style={{ textAlign: 'center' }}>
            Report By {monthSelect.getMonth() + 1}/{monthSelect.getFullYear()}
          </h4>
        }
        labelPosition="center"
      />

      {/* <h5 style={{textAlign: 'center'}}>Report By {monthSelect.getMonth()+1}/{monthSelect.getFullYear()}</h5> */}
    </div>
  )
}

export default ReportsPage
