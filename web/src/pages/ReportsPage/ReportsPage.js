import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ReportByGroupCell from 'src/components/Report/ReportByGroupCell'
import Report from '/src/components/Report/Report/Report'

const ReportsPage = () => {
  return (
    <>
      <MetaTags title="Reports" description="Reports page" />

      <Report />
    </>
  )
}

export default ReportsPage
