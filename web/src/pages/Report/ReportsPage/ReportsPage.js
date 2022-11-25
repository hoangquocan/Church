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
      {hasRole('leader') && (
        <nav className="reports-navheader">
          <Link
            className="inline-button inline-button-small inline-button-blue"
            to={routes.report()}
          >
            <ion-icon name="document-text-outline"></ion-icon>View Report
          </Link>
          <Link
            className="inline-button inline-button-small inline-button-green"
            to={routes.reportCreate()}
          >
            <ion-icon name="open-outline"></ion-icon>Create Report
          </Link>
        </nav>
      )}
      <ReportsPortalCell fromMonth={fromMonth} toMonth={toMonth} />
      <Divider size="md" mt={60} ml={-30} mr={-30} mb={20} />
      <div className="reports-select-month">
        <h3 style={{marginBottom: 0}} className='text-title'>View Chart Result</h3>
        <DatePicker
          selected={monthSelect}
          onChange={(date) => setMonthSelect(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
          popperPlacement='bottom'
        />
      </div>
      <ReportChartByMonthCell timeReport={timeReport} />
      <Divider
        my="xs"
        mt={30}
        label={
          <h4 style={{ textAlign: 'center', color: '#46e6fc' }}>
            Chart By {monthSelect.getMonth() + 1}/{monthSelect.getFullYear()}
          </h4>
        }
        labelPosition="center"
      />
    </div>
  )
}

export default ReportsPage
